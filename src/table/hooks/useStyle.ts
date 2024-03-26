import { computed, toRefs } from 'vue';
import { TdBaseTableProps } from '../type';
import useClassName from './useClassName';
import useCommonClassName from '../../hooks/useCommonClassName';
import { useConfig } from '../../hooks/useConfig';

export function formatCSSUnit(unit: string | number) {
  if (!unit) return unit;
  return isNaN(Number(unit)) ? unit : `${unit}px`;
}

export default function useStyle(props: TdBaseTableProps) {
  const { size, bordered, stripe, hover, verticalAlign, height, maxHeight, tableContentWidth } = toRefs(props);

  const { tableBaseClass, tableAlignClasses } = useClassName();
  const { sizeClassNames } = useCommonClassName();
  const { globalConfig } = useConfig('table', props.locale);
  const tableSize = computed(() => size.value ?? globalConfig.value.size);

  const tableClasses = computed(() => [
    tableBaseClass.table,
    {
      [sizeClassNames[tableSize.value]]: tableSize.value !== 'medium',
      [tableBaseClass.bordered]: bordered.value,
      [tableBaseClass.striped]: stripe.value,
      [tableBaseClass.hover]: hover.value,
      [tableBaseClass.loading]: props.loading,
      [tableBaseClass.affixedHeader]: props.headerAffixedTop,
      [tableBaseClass.rowspanAndColspan]: props.rowspanAndColspan,
      [tableAlignClasses[verticalAlign.value]]: verticalAlign.value !== 'middle',
    },
  ]);

  const tableContentStyles = computed(() => ({
    height: formatCSSUnit(height.value),
    maxHeight: formatCSSUnit(maxHeight.value),
  }));

  const tableElementStyles = computed(() => ({
    width: formatCSSUnit(tableContentWidth.value),
  }));

  return {
    tableClasses,
    sizeClassNames,
    tableElementStyles,
    tableContentStyles,
  };
}
