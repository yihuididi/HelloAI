import styles from './Sidebar.module.css';
import SidebarItem from './SidebarItem/SidebarItem';
import { HiOutlineBookOpen, HiOutlineGlobeAlt } from 'react-icons/hi'
import { LuAudioWaveform } from 'react-icons/lu';
import { PiMicrophoneStageBold, PiWavesBold } from 'react-icons/pi';

interface Props {
  assessment: string | null;
}

function Sidebar({ assessment }: Props) {
  return (
    <>
      <div className={styles.placeholder} />
      <div className={styles.sidebar}>
        <SidebarItem
          assessment='overview'
          icon={<HiOutlineGlobeAlt />}
          selected={assessment === 'overview'}
        />
        <SidebarItem
          assessment='content'
          icon={<HiOutlineBookOpen />}
          selected={assessment === 'content'}
        />
        <SidebarItem
          assessment='pronunciation'
          icon={<PiMicrophoneStageBold />}
          selected={assessment === 'pronunciation'}
        />
        <SidebarItem
          assessment='intonation'
          icon={<LuAudioWaveform />}
          selected={assessment === 'intonation'}
        />
        <SidebarItem
          assessment='fluency'
          icon={<PiWavesBold />}
          selected={assessment === 'fluency'}
        />
      </div>
    </>
  );
}

export default Sidebar;