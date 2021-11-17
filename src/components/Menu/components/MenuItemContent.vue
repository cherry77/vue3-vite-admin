<template>
  <span :class="`${prefixCls}- flex items-center `">
    <Icon :icon="item.meta.icon" :size="16" class="mr-2"/>
    {{ getI18nName }}
  </span>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useDesign } from '@/hooks/web/useDesign';
import { useI18n } from '@/hooks/web/useI18n'
import Icon from '@/components/Icon/index';

const { t } = useI18n();
export default defineComponent({
  props: {
    item: {
      type: Object,
      default: () => { }
    },
  },
  components: {
    Icon
  },
  setup(props) {
    const { prefixCls } = useDesign('basic-menu-item-content');
    const getI18nName = computed(() => t(props.item?.meta.title));
    const getIcon = computed(() => props.item?.icon);
    return {
      prefixCls,
      getI18nName,
      getIcon
    }
  }
})
</script>
<style></style>