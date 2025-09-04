import classNames from 'classnames';

import styles from './style.module.css';

const colours = {
  1: 'RED',
  2: 'ORANGE',
  3: 'YELLOW',
  4: 'GREEN',
  5: 'TEAL',
  6: 'BLUE',
  7: 'INDIGO',
  8: 'VIOLET',
  9: 'BROWN',
};

const Cell = ({
  renderColourPalette = true,
  dataRow,
  dataCell,
  dataValue,
  disable,
  onClickHandler,
  additionalClasses,
}: {
  renderColourPalette?: boolean;
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
  return (
    <>
      <div
        className={classNames(styles['cell'], additionalClasses)}
        data-row={dataRow}
        data-cell={dataCell}
        data-value={String(dataValue)}
        data-disable={disable}
      >
        {renderColourPalette && (
          <div
            className={classNames(
              styles['colour-palette-wrapper'],
              styles['hide'],
            )}
          >
            {Object.entries(colours).map(([key, value]) => (
              <button
                key={key}
                className={classNames(styles['colour-dot'])}
                data-cell-parent={dataCell}
                data-value={key}
                onClick={!disable ? onClickHandler : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Cell;
