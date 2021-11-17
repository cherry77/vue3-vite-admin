<template>
  <!-- https://iconify.design/ -->
  <!-- https://github.com/antfu/purge-icons/tree/main/packages/vite-plugin-purge-icons -->
  <span ref="elRef" :class="[$attrs.class, 'app-iconify anticon']" :style="getWrapStyle"></span>
</template>

<script lang="ts">
import type { PropType, CSSProperties } from 'vue';
import { defineComponent, ref, unref, onMounted, computed, nextTick } from 'vue'
import { isString } from '@/utils/is';

export default defineComponent({
  props: {
    icon: {
      type: String
    },
    color: {
      type: String
    },
    size: {
      type: [String, Number] as PropType<string | number>,
      default: 16,
    },
  },
  setup(props) {
    const elRef = ref<HTMLElement | null>(null)

    const update = async() => {
      const el = unref(elRef);
      if (!el) return;

      // await nextTick();

      const span = document.createElement('span')
      span.className = 'iconify'
      span.dataset.icon = props.icon
      el.appendChild(span);
    }

    // 将样式放在父盒子上，不一定需要放在icon
    const getWrapStyle = computed((): CSSProperties => {
      const { size, color } = props;
      let fs = size;
      // 这里isString封装成工具方法
      if (isString(size)) {
        fs = parseInt(size, 10);
      }

      return {
        fontSize: `${fs}px`,
        color: color,
        display: 'inline-flex', // 这个需要再看下，可以起到什么效果
      };
    });

    onMounted(update)

    return {
      elRef,
      getWrapStyle
    }
  }
})
</script>
<style lang="less">
  .app-iconify {
    display: inline-block;
    // vertical-align: middle;

    &-spin {
      svg {
        animation: loadingCircle 1s infinite linear;
      }
    }
  }

  span.iconify {
    display: block;
    min-width: 1em;
    min-height: 1em;
    background-color: @iconify-bg-color;
    border-radius: 100%;
  }
</style>