import classNames from 'classnames';

import { eventBus } from '../../utils/eventBus';

import style from './style.module.css';

export default function Controls({
  onStartClickHandler,
  onQuitClickHandler,
}: Readonly<{
  onStartClickHandler: () => void;
  onQuitClickHandler?: () => void;
}>) {
  return (
    <div className={style['controls']}>
      <div className={style['elements-wrapper']}>
        <div className={style['game-controls-d-pad']}>
          <button
            className={classNames('button-reset', style['pad-left'])}
            onClick={() => eventBus.emit('left', undefined)}
            aria-label="Move left"
          />
          <button
            className={classNames('button-reset', style['pad-down'])}
            onClick={() => eventBus.emit('down', undefined)}
            aria-label="Move down"
          />
          <button
            className={classNames('button-reset', style['pad-up'])}
            onClick={() => eventBus.emit('up', undefined)}
            aria-label="Move up"
          />
          <button
            className={classNames('button-reset', style['pad-right'])}
            onClick={() => eventBus.emit('right', undefined)}
            aria-label="Move right"
          />

          <div className={style['d-pad-spacer']}></div>
        </div>
        <div className={style['buttons-wrapper']}>
          <span className={style['button-text-wrapper']}>
            <p className={style['button-text']}>RESTART</p>
            <button
              className={classNames('button-reset', style['button'])}
              onClick={onStartClickHandler}
              aria-label="Restart game"
            />
          </span>
          <span className={style['button-text-wrapper']}>
            <p className={style['button-text']}>QUIT</p>
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
            onClick={() => eventBus.emit('actionA', undefined)}
            aria-label="A button"
          />
          <button
            className={classNames('button-reset', style['button-b'])}
            onClick={() => eventBus.emit('actionB', undefined)}
            aria-label="B button"
          />
        </div>
      </div>
    </div>
  );
}
