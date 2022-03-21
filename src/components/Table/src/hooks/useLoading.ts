import { ref, unref, computed } from 'vue'

export default function useLoading(loading: boolean) {
  // const loadingRef = ref(unref(props).loading);
  const loadingRef = ref<boolean>(loading);

  const getLoading = computed(() => unref(loadingRef));

  function setLoading(loading: boolean) {
    loadingRef.value = loading;
  }
  return {
    getLoading,
    setLoading
  }
}