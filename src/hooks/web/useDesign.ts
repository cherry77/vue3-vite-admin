export function useDesign(scope: string) {
  return {
    prefixCls: `cherry-${scope}`,
    prefixVar: 'cherry',
  };
}
