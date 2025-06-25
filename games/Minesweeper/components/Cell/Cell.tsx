import { memo, useCallback, useEffect, useRef } from 'react';

import classNames from 'classnames';

import styles from './style.module.css';

const Cell = memo(function Cell({
  value = 0,
  pos = '',
  onClickCellCallback,
}: {
  value?: number;
  pos?: string;
  onClickCellCallback?: (pos: string) => void;
}) {
  const hiddenValues = [-1, 0, 9];
  const cellRef = useRef(null);

  const onClick = useCallback(
    (e) => {
      if (onClickCellCallback) {
        onClickCellCallback(e);
      }
    },
    [onClickCellCallback],
  );

  useEffect(() => {
    if (!onClickCellCallback) return;

    const currentRef = cellRef.current;

    (currentRef as unknown as HTMLElement)?.addEventListener('click', onClick);

    return () => {
      (currentRef as unknown as HTMLElement)?.removeEventListener(
        'click',
        onClick,
      );
    };
  }, [onClick, onClickCellCallback]);

  return (
    <div
      ref={cellRef}
      className={classNames('board-cell', styles['cell'])}
      data-reveal={false}
      data-value={value}
      data-pos={pos}
    >
      {!hiddenValues.includes(value) && value}
    </div>
  );
});

export default Cell;
