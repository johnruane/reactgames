import classNames from 'classnames';

import style from './style.module.css';

export default function Controls({
  move,
  onStartClickHandler,
  onQuitClickHandler,
}: Readonly<{
  move: (unknown: string) => void;
  onStartClickHandler: () => void;
  onQuitClickHandler?: () => void;
}>) {
  return (
    <div className={style['controls']}>
      <div className={style['elements-wrapper']}>
        <div className={style['game-controls-d-pad']}>
          <button
            className={classNames('button-reset', style['pad-left'])}
            onClick={() => move('ArrowLeft')}
            aria-label="Move left"
          />
          <button
            className={classNames('button-reset', style['pad-down'])}
            onClick={() => move('ArrowDown')}
            aria-label="Move down"
          />
          <button
            className={classNames('button-reset', style['pad-up'])}
            onClick={() => move('ArrowUp')}
            aria-label="Move up"
          />
          <button
            className={classNames('button-reset', style['pad-right'])}
            onClick={() => move('ArrowRight')}
            aria-label="Move right"
          />

          <div className={style['d-pad-spacer']}></div>
        </div>
        <div className={style['buttons-wrapper']}>
          <span className={style['button-text-wrapper']}>
            <p className={style['button-text']}>START</p>
            <button
              className={classNames('button-reset', style['button'])}
              onClick={onStartClickHandler}
              aria-label="Start game"
            />
          </span>
          <span className={style['button-text-wrapper']}>
            <p className={style['button-text']}>SELECT</p>
            <button
              className={classNames('button-reset', style['button'])}
              onClick={onQuitClickHandler}
              aria-label="Open games menu"
            />
          </span>
        </div>
        <div className={style['control-buttons']}>
          <button
            className={classNames('button-reset', style['button-a'])}
            onClick={() => move('Space')}
            aria-label="A button"
          />
          <button
            className={classNames('button-reset', style['button-b'])}
            aria-label="B button"
          />
        </div>
      </div>
    </div>
  );
}
