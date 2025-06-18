import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';

import './style.css';

const MooCell = ({
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
      className={classNames(`board-cell`, additionalClasses)}
      data-row={dataRow}
      data-cell={dataCell}
      data-value={String(dataValue)}
      onClick={!disable ? onClickHandler : undefined}
    />
  );
};

export default MooCell;
