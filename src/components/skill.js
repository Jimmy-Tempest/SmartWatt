import styles from '../../styles/modules/skill.module.scss'
import Image from 'next/image'
import {useState} from 'react';
import firebase from "../libs/clientApp"
import { useDownloadURL } from 'react-firebase-hooks/storage';

export default function Skill(props) {

  const [state, setState] = useState({skill:props, rendering:true})
  const [downloadUrl, loading, error] = useDownloadURL(firebase.storage().ref(props.src));
  
  
    if (!loading && downloadUrl && state.rendering)
    setState({skill:{...props, src:downloadUrl}, rendering:false});


  return (
    <div title={state.skill.name} className={styles["skill-container"]}>
        <span className={styles["skill-card"]}>{state.skill.name}</span>
        {/* {console.log(state.skill)} */}
        {!loading ? <Image src={state.skill.src} alt={state.skill.name} width={75} height={75} /> : null}
    </div>
  )
}