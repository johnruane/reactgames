import classNames from 'classnames';
import style from './style.module.css';

export default function Panel({
  sections,
}: {
  sections: Record<string, string | number | React.ReactNode>[];
}) {
  return (
    <div className={style['panel-wrapper']}>
      {sections?.map((section) => {
        const { heading = null, value = null } = section || {};
        return (
          <div className={style['panel']} key={`${heading}` || `${value}`}>
            {heading !== null && (
              <p className={classNames(style['text'], style['bold'])}>{heading}</p>
            )}
            {value !== null && <div className={style['text']}>{value}</div>}
          </div>
        );
      })}
    </div>
  );
}
