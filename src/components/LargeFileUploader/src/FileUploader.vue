<template>
  <input type="file" @change="handleFileChange" />
  <Button type="primary" @click="handleUpload">上传</Button>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { defHttp } from "@/utils/request";
import http from "@/utils/http.js";
import { Button } from "ant-design-vue";
const state = reactive({
  file: null,
  chunkFiles: [],
});
const CHUNKSIZE = 10 * 1024;
const handleFileChange = (e) => {
  const [file] = e.target.files;
  if (!file) return;
  state.file = file;
  console.log("--------------", state.file);
};

// const createFileChunk = (file, chunkSize = CHUNKSIZE) => {
//   let curSize = 0,
//     resIndex = 0,
//     chunkFileList = Array(Math.ceil(file.size / chunkSize));
//   while (curSize < file.size) {
//     chunkFileList[resIndex++] = { file: file.slice(curSize, (curSize += chunkSize)) };
//   }
//   return chunkFileList;
// };

const createFileChunk = (file, size = CHUNKSIZE) => {
  const fileChunkList = [];
  let cur = 0;
  while (cur < file.size) {
    fileChunkList.push({ file: file.slice(cur, cur + size) });
    cur += size;
  }
  return fileChunkList;
};

const mergeRequest = async () => {
  await defHttp.fetch({
    url: "http://0.0.0.0:2018/api/hr_api/merge",
    data: {
      filename: state.file.name,
    },
    method: "post",
  });
};

const createProgressHandler = (item) => {
  return e => {
    item.percentage = parseInt(String((e.loaded / e.total) * 100));
  }
}

const uploadChunks = async () => {
  const requestList = state.chunkFiles
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
        // headers: {
        //   'Content-type': 'multipart/form-data;charset=UTF-8'
        // }
      })
    );
  await Promise.all(requestList);
  await mergeRequest();
};

const handleUpload = async () => {
  if (!state.file) return;
  const chunkFileList = createFileChunk(state.file);
  state.chunkFiles = chunkFileList.map(({ file }, index) => ({
    chunk: file,
    hash: state.file.name + "-" + index,
    index,
    percentage: 0 // 进度
  }));
  await uploadChunks();
};
</script>
<style scoped></style>
