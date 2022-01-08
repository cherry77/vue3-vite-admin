<template>
  <span :class="`${prefixCls}- flex items-center`">
    <Icon v-if="getIcon" :icon="getIcon" :size="18" class="mr-2" />
    {{ getI18nName }}
  </span>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useDesign } from '@/hooks/web/useDesign';
import { useI18n } from '@/hooks/web/useI18n'
import Icon from '@/components/Icon/index';

const { t } = useI18n();
const props = defineProps({
  item: {
    type: Object,
    default: () => { }
  },
})
const { prefixCls } = useDesign('basic-menu-item-content');
const getI18nName = computed(() => t(props.item?.meta.title));
const getIcon = computed(() => props.item?.meta?.icon);
</script>
<style></style>