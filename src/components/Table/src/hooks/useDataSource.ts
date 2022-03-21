import { ref, unref, onMounted } from 'vue'
import { isFunction } from '@/utils/is'
import { merge } from 'lodash-es'

export default function useDataSource(props, { getPaginationInfo, setPagination, setLoading }) {
	const dataSourceRef = ref<any[]>([]) // 再定义一个变量存放table的最终数据dataSource

	onMounted(() => {
		// watchEffect(() => getDataSourceRef())
		getDataSourceRef()
	})

	async function getDataSourceRef() {
		const { dataSource } = unref(props) // unref()：是 val = isRef(val) ? val.value : val 的语法糖。

		dataSource ? (dataSourceRef.value = dataSource) : await fetch()
	}

	async function fetch() {
		const { api, } = unref(props)
		if (!api || !isFunction(api)) return

		const { current = 1, pageSize } = unref(getPaginationInfo)
		const pageParams = {
			current,
			pageSize,
		}

		const params = merge(pageParams)
		try {
			setLoading(true)
			const res = await api(params)
			dataSourceRef.value = res.data.result.items
			setPagination({ total: res.data.result.total })
		} catch (error) {
			console.log('-----', error)
		} finally {
			setLoading(false)
		}
	}

	function handleTableChange(pagination) {
		setPagination(pagination)
		fetch()
	}

  function reload(){
    console.log('reload')
  }

	return {
		dataSourceRef,
		handleTableChange,
    reload
	}
}
