import useIsMobile from '../../../hooks/useIsMobile';
import styles from './SidebarItem.module.css';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  assessment: 'overview' | 'content' | 'pronunciation' | 'intonation' | 'fluency';
  icon: ReactNode;
  selected: boolean;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function SidebarItem({ assessment, icon, selected }: Props) {
  const isMobile = useIsMobile();

  return (
    <Link
      to={`?assessment=${assessment}`}
      className={`${styles.sidebarItem} ${selected ? styles.selected : ''}`}
    >
      <span className={styles.iconWrapper}>
        {icon}
      </span>
      {!isMobile &&
        <span className={styles.tooltip}>
          {capitalize(assessment)}
        </span>
      }
    </Link>
  );
}

export default SidebarItem;