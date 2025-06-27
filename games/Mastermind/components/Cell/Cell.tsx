import classNames from 'classnames';

import styles from './style.module.css';

const Cell = ({
  dataRow,
  dataCell,
  dataValue,
  disable,
  onClickHandler,
  additionalClasses,
}: {
  dataRow?: number;
  dataCell?: number;
  dataValue?: number;
  onClickHandler?: (
    e: React.MouseEvent<HTMLSpanElement>,
    direction?: string,
  ) => void;
  additionalClasses?: string;
  disable?: boolean;
}) => {
  function handleRightClick(e) {
    e.preventDefault();
    if (onClickHandler) {
      onClickHandler(e, 'backwards');
    }
  }

  return (
    <span
      className={classNames(styles['cell'], additionalClasses)}
      data-row={dataRow}
      data-cell={dataCell}
      data-value={String(dataValue)}
      onClick={!disable ? onClickHandler : undefined}
      onContextMenu={!disable ? handleRightClick : undefined}
    />
  );
};

export default Cell;
