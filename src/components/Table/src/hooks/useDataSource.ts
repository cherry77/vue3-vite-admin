import { ref, unref, onMounted } from 'vue'
import { isFunction } from '@/utils/is'

export default function useDataSource(props) {
	const dataSourceRef = ref<any[]>([]) // 再定义一个变量存放table的最终数据dataSource

	async function getDataSourceRef() {
		const { dataSource, api } = unref(props) // unref()：是 val = isRef(val) ? val.value : val 的语法糖。
		if (!api && dataSource) {
			dataSourceRef.value = dataSource
		} else {
			const res = await api()
			dataSourceRef.value = res.data.result.items
		}
	}

	async function fetch() {
		const { api } = unref(props)
		if (!api || !isFunction(api)) return

		try {
			const res = await api()
			dataSourceRef.value = res.data.result
		} catch (error) {
			console.log('-----', error)
		} finally {
		}
	}

	onMounted(() => {
		getDataSourceRef()
	})
  
	return {
		dataSourceRef
	}
}
