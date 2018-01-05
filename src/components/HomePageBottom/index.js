import React from 'react';
const styles = require('./style.css');
import { dispatch } from '../../store';
import Cooperative1 from '../../assets/images/cooperative_01.png';
import Cooperative2 from '../../assets/images/cooperative_02.png';
import Cooperative3 from '../../assets/images/cooperative_03.png';
import Cooperative4 from '../../assets/images/cooperative_04.png';
import Cooperative5 from '../../assets/images/cooperative_05.png';
import Cooperative6 from '../../assets/images/cooperative_06.png';
import Cooperative7 from '../../assets/images/cooperative_07.png';
import Cooperative8 from '../../assets/images/cooperative_08.png';
import Cooperative9 from '../../assets/images/cooperative_09.png';
import Cooperative10 from '../../assets/images/cooperative_10.png';
import Cooperative11 from '../../assets/images/cooperative_11.png';
import Cooperative12 from '../../assets/images/cooperative_12.png';
import Cooperative13 from '../../assets/images/cooperative_13.png';
import Cooperative14 from '../../assets/images/cooperative_14.png';
import Cooperative15 from '../../assets/images/cooperative_15.png';
import Cooperative16 from '../../assets/images/cooperative_16.png';
import BankLogo from '../../assets/images/bank-logo.png';
import safe from '../../assets/images/safe.png';
import { push } from 'react-router-redux';
const NUM = 28;
const HomePageBottom = () => {
  return (
    <div>
        <div  className={styles.entrys}>
       <div className={styles.container}>
            <div className={styles.bottom1}>
               <div className={styles.bottomText}>15家银行合作 充值提现更方便</div>
               <div className={styles.navBottom}>
                 <div><img src={BankLogo} /></div>
                 {/*<div><img src={Cooperative1} width={NUM}/></div>
                 <div><img src={Cooperative2} width={NUM}/></div>
                 <div><img src={Cooperative3} width={NUM}/></div>
                 <div><img src={Cooperative4} width={NUM}/></div>
                 <div><img src={Cooperative5} width={NUM}/></div>
                 <div><img src={Cooperative6} width={NUM}/></div>
                 <div><img src={Cooperative7} width={NUM}/></div>
                 <div><img src={Cooperative8} width={NUM}/></div>
                 <div><img src={Cooperative9} width={NUM}/></div>
                 <div><img src={Cooperative10} width={NUM}/></div>
                 <div><img src={Cooperative11} width={NUM}/></div>*/}
               </div>
            </div>
            <div className={styles.bottomBorder} />
            <div className={styles.bottom1}>
              <div className={styles.bottomText}>100%奖金安全 全球顶级安全协议</div>
              <div className={styles.navBottom}>
                <div><img src={safe} /></div>
                 {/*<div><img src={Cooperative11} width={NUM}/></div>
                <div><img src={Cooperative12} width={NUM}/></div>
                <div><img src={Cooperative13} width={NUM}/></div>
                <div><img src={Cooperative14} width={NUM}/></div>
                <div style={{ marginTop : '11px'}}><img src={Cooperative16} width={NUM}/></div>*/}
              </div>
            </div>
            <div className={styles.bottomBorder} />
            <div className={styles.bottom1}>
              <div className={styles.bottomText}>使用帮助</div>
              <div className={styles.navBottom}>
                <div className={styles.bottomText1} onClick={() => {dispatch(push('/help-center?type=3'))}}>玩法介绍</div>
                <div className={styles.bottomText1} onClick={() => {dispatch(push('/help-center?type=1'))}}>如何充值</div>
                <div className={styles.bottomText1} onClick={() => {dispatch(push('/help-center?type=2'))}}>提现须知</div>
              </div>
            </div>
       </div></div>
        <div className={styles.copyright}>2003-2017 亿合娱乐 All Rigths Reserved</div>
    </div>
  );
}

export default HomePageBottom;
