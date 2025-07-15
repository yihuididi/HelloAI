import styles from './SidebarItem.module.css';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  assessment: 'content' | 'pronunciation' | 'intonation' | 'fluency';
  icon: ReactNode;
  selected: 'content' | 'pronunciaton' | 'intonation' | 'fluency';
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function SidebarItem({ assessment, icon, selected }: Props) {
  return (
    <Link
      to={`?assessment=${assessment}`}
      className={`${styles.sidebarItem} ${selected ? styles.selected : ''}`}
    >
      <span className={styles.iconWrapper}>
        {icon}
      </span>
      <span className={styles.tooltip}>
        {capitalize(assessment)}
      </span>
    </Link>
  );
}

export default SidebarItem;