<template>
  <div style="padding: 20px">
    <input type="file" @change="handleFileChange" />
    <Button type="primary" @click="handleUpload">上传</Button>
    <Button type="primary" v-show="state.loading" class="mx-4" @click="handlePause"
      >暂停</Button
    >
    <Button type="primary" v-show="state.paused" @click="handleContinue">继续</Button>
    <div class="w-1/2 py-5">
      <h3>计算文件hash</h3>
      <Progress :percent="state.hashPercentage" />
      <h3>总进度</h3>
      <Progress :percent="uploadPercentage" />
      <h3>切片进度</h3>
      <template v-for="item in state.chunkFiles" :key="item.hash">
        <div class="px-5">
          {{item.hash}} （{{item.chunk.size}}KB）
          <Progress :percent="item.percentage"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import axios, { CancelToken } from "axios";
import { defHttp } from "@/utils/request";
import http from "@/utils/http.js";
import { Button, Progress, message, Table } from "ant-design-vue";
const state = reactive({
  file: null,
  chunkFiles: [],
  filehash: null,
  worker: null,
  hashPercentage: 0,
  loading: false,
  paused: false,
});
const CHUNKSIZE = 100 * 1024 * 1024;
let cancelMethod; // 用于取消上传

const uploadPercentage = computed(() => {
  if (!state.file || !state.chunkFiles.length) return 0;

  const loaded = state.chunkFiles
    .map((item) => item.chunk.size * item.percentage)
    .reduce((acc, cur) => acc + cur, 0);
  return parseInt((loaded / state.file.size).toFixed(2));
});

const handleFileChange = (e) => {
  const [file] = e.target.files;
  if (!file) return;
  state.file = file;
};

// 分片
const createFileChunk = (file, size = CHUNKSIZE) => {
  const fileChunkList = [];
  let cur = 0;
  while (cur < file.size) {
    fileChunkList.push({ file: file.slice(cur, cur + size) });
    cur += size;
  }
  return fileChunkList;
};

// 发起合并切片请求
const mergeRequest = async () => {
  if (state.paused) return;
  await defHttp.fetch({
    url: "http://0.0.0.0:2018/api/hr_api/merge",
    data: {
      filename: state.file.name,
      filehash: state.filehash,
    },
    method: "post",
  });
};

const createProgressHandler = (item) => {
  return (e) => {
    item.percentage = parseInt(String((e.loaded / e.total) * 100));
  };
};

// 上传切片
const uploadChunks = async (uploadedList) => {
  const cancelToken = new CancelToken(function (cancel) {
    cancelMethod = cancel;
  });
  const requestList = state.chunkFiles
    .filter(({ hash }) => !uploadedList.includes(hash))
    .map(({ chunk, hash, index }) => {
      const formData = new FormData();
      formData.append("file", chunk);
      formData.append("hash", hash);
      formData.append("filename", state.file.name);
      return { formData, index };
    })
    .map(({ formData, index }) =>
      defHttp.fetch({
        url: "http://0.0.0.0:2018/api/hr_api/upload_file",
        data: formData,
        method: "post",
        onUploadProgress: createProgressHandler(state.chunkFiles[index]),
        cancelToken: cancelToken,
      })
    );
  await Promise.all(requestList);
  await mergeRequest();
};

// 生成文件hash (web worker)
const calculateHash = (chunkFileList) => {
  return new Promise((resolve, reject) => {
    state.worker = new Worker("/hash.js");
    state.worker.postMessage({ chunkFileList });
    state.worker.onmessage = (e) => {
      const { percentage, hash } = e.data;
      state.hashPercentage = percentage;
      if (hash) {
        resolve(hash);
      }
    };
  });
};

// 验证是否已上传或者未上传完（将已上传的切片返回）
const verifyUpload = async (filename, filehash) => {
  const res = await defHttp.fetch({
    url: "http://0.0.0.0:2018/api/hr_api/verify",
    data: { filename, filehash },
    method: "post",
  });
  return res.data.data;
};

const handleUpload = async () => {
  if (!state.file) return;
  state.loading = true;
  // 分片
  const chunkFileList = createFileChunk(state.file);
  // 计算hash值
  state.filehash = await calculateHash(chunkFileList);
  // 验证是否已上传或者未上传完（将已上传的切片返回）
  const { uploaded, uploaded_list: uploadedList } = await verifyUpload(
    state.file.name,
    state.filehash
  );
  if (uploaded) {
    message.success("秒传：上传成功");
  } else {
    state.chunkFiles = chunkFileList.map(({ file }, index) => {
      const hash = state.filehash + "-" + index;
      return {
        filehash: state.filehash,
        chunk: file,
        hash,
        index,
        percentage: uploadedList.includes(hash) ? 100 : 0, // 进度
      };
    });
    await uploadChunks(uploadedList);
  }
  state.loading = false;
};

const handlePause = () => {
  if (!state.loading) return;

  cancelMethod("暂停上传");
  state.loading = false;
  state.paused = true;
};

const handleContinue = () => {
  state.paused = false;
  handleUpload();
};
</script>
<style scoped></style>
