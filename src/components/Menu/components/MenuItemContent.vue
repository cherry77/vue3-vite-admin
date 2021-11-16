<template>
  <span>
    <PieChartOutlined />
    {{ getI18nName }}
  </span>
  <span></span>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n();
export default defineComponent({
  props: {
    item: {
      type: Object,
      default: () => { }
    },
  },
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
  },
  setup(props) {
    const getI18nName = computed(() => t(props.item?.meta.title));
    return {
      getI18nName
    }
  }
})
</script>
<style></style>