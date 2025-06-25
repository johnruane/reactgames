import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import styles from './style.module.css';

const MastermindCell = ({
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
  onClickHandler?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  additionalClasses?: string;
  disable?: boolean;
}) => {
  return (
    <span
      className={classNames(styles['cell'], additionalClasses)}
      data-row={dataRow}
      data-cell={dataCell}
      data-value={String(dataValue)}
      onClick={!disable ? onClickHandler : undefined}
    />
  );
};

export default MastermindCell;
