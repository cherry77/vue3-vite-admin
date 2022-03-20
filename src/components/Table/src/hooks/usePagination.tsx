import { ref, computed, unref } from 'vue'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';

const PAGE_SIZE = 5
const PAGE_SIZE_OPTIONS = ['10', '50', '80', '100']

export default function usePagination(props) {
  const configRef = ref({});
  const { pagination } = unref(props);

  function itemRender({ page, type, originalElement }: any) {
    if (type === 'prev') {
      return page === 0 ? null : <LeftOutlined />;
    } else if (type === 'next') {
      return page === 1 ? null : <RightOutlined />;
    }
    return originalElement;
  }
	const getPaginationInfo = computed(() => {
		return {
			current: 1,
			pageSize: PAGE_SIZE,
			size: 'small',
			defaultPageSize: PAGE_SIZE,
      pageSizeOptions: PAGE_SIZE_OPTIONS,
      showSizeChanger: true,
      showTotal: (total: number) => `共 ${total} 条数据`,
      showQuickJumper: true,
      itemRender: itemRender,
			...pagination,
      ...unref(configRef)
		}
	})
  
  function setPagination(info: any) {
    const paginationInfo = unref(getPaginationInfo);
    configRef.value = {
      ...paginationInfo,
      ...info,
    };
  }
	return {
		getPaginationInfo,
    setPagination
	}
}
