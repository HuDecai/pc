import { message, notification } from 'antd';
import Tinker from '../lib/tinker/src/index';
import reduxTinker from '../lib/tinker/src/reduxTinker';
import { dispatch } from '../store';
import { replace } from 'react-router-redux';
import moment from 'moment';

/**
 *  获取第几期开奖结果
 * @type {String}
 */
export const GET_LOTTERY_RESULT = 'GET_LOTTERY_RESULT';
export const getLotteryResult = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/lotteryResult/lotteryResultOne.do`,
    {
      method: 'POST',
    },
    params,
  ).success(result => {
    try{
      if(params.closeExpect && params.closeExpect > result.data.expect){
        setTimeout(() => {
           const lId = window.location.hash.split('?')[1] ? window.location.hash.split('?')[1].split('=')[1] : '';
           if(lId && lId == params.lId) {
                getLotteryResult({ lId: params.lId, closeExpect: params.closeExpect });
                getLotteryResultList({ lId: params.lId, rowNumber: 10 });// 今日开奖
                if(lId == 15) {
                  findUserBetList({ lId, pageNo: 1, pageSize: 20, betTimeStart: moment().format('YYYY-MM-DD') }); // 香港彩今日投注
                }else {
                  findUserBetList({ pageNo: 1, pageSize: 20, betTimeStart: moment().format('YYYY-MM-DD') }); // 今日投注
                }
            }
          }, 5000);    
      }
    }catch(e) {}
  });
  reduxTinker(fetchHandler, GET_LOTTERY_RESULT, dispatch).start();
};

/**
 * 获取彩种列表
 * @type {String}
 */
export const GET_LOTTERY_TYPE_LIST = 'GET_LOTTERY_TYPE_LIST';
export const getLotteryTypeList = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/lottery/findListLottery.do`,
    {
      method: 'GET',
    },
    params,
  )
  reduxTinker(fetchHandler, GET_LOTTERY_TYPE_LIST, dispatch).start();
};

/**
 * 更换当前彩票类型
 * @type {String}
 */
export const CHANGE_LOTTERY_TYPE = 'CHANGE_LOTTERY_TYPE';
export const changeLotteryType = (params) => {
  getCurrentLottery({ lId: params.lId });
  dispatch({
    type: CHANGE_LOTTERY_TYPE,
    payload: params,
  });
};
export const GET_CURRENT_LOTTERY = 'GET_CURRENT_LOTTERY';
export const getCurrentLottery = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/playKind/findeByLidForLottery.do`,
    {
      method: 'POST',
    },
    params,
  )
  reduxTinker(fetchHandler, GET_CURRENT_LOTTERY, dispatch).start();
}

/**
 * 一级目录选择
 * @type {String}
 */
export const SET_CURRENTLOTTERY_FIRSTMENU = 'SET_CURRENTLOTTERY_FIRSTMENU';
export const setCurrentLotteryFirstMenu = (params) => {
  dispatch({
    type: SET_CURRENTLOTTERY_FIRSTMENU,
    payload: params,
  });
};

/**
 * 香港彩目录选择
 * @type {String}
 */
export const SET_HONK_KONG_MENU = 'SET_HONK_KONG_MENU';
export const setHongKongMenu = (params) => {
  dispatch({
    type: SET_HONK_KONG_MENU,
    payload: params,
  });
};

export const CHANGE_PLAY_KIND = 'CHANGE_PLAY_KIND';
export const changePlayKind = (params) => {
  dispatch({
    type: CHANGE_PLAY_KIND,
    payload: params,
  });
};

/**
 *  获取开奖列表
 * @type {String}
 */
export const GET_LOTTERY_RESULT_LIST = 'GET_LOTTERY_RESULT_LIST';
export const getLotteryResultList = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/lotteryResult/lotteryResultByLid.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_LOTTERY_RESULT_LIST, dispatch).start();
};

/**
 *  获取中奖列表
 * @type {String}
 */
export const GET_LOTTERY_WIN_LIST = 'GET_LOTTERY_WIN_LIST';
export const getLotteryWinList = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/bet/winningRanking.do`,
    {
      method: 'GET',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_LOTTERY_WIN_LIST, dispatch).start();
};


/**
 *  获取指定彩种当前销售彩票和上期期数
 * @type {String}
 */
export const GET_LOTTERY_EXPECT = 'GET_LOTTERY_EXPECT';
export const getLotteryExpect = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/playKind/findeDateByLid.do`,
    {
      method: 'POST',
    },
    params,
  ).success((result) => {
    try {
      const adminTime = Number(result.data.adminTime);
      const time = Number(result.data.time);
      setTimeout(function () {
        // 获取url中的lId
        const lId = window.location.hash.split('?')[1] ? window.location.hash.split('?')[1].split('=')[1] : '';
        if(lId && lId == params.lId) {
          getLotteryResult({ lId: params.lId, closeExpect: result.data.openExpect}); // 开奖结果
          getLotteryResultList({ lId: params.lId, rowNumber: 10 });// 今日开奖
          if(lId == 15) {
            findUserBetList({ lId, pageNo: 1, pageSize: 20, betTimeStart: moment().format('YYYY-MM-DD') }); // 香港彩今日投注
          }else {
            findUserBetList({ pageNo: 1, pageSize: 20, betTimeStart: moment().format('YYYY-MM-DD') }); // 今日投注
          }
        }
        
        //订单详情
        if(window.location.hash.indexOf('order-info') !== -1) {
          const id = window.location.hash.split('?')[1].split('&')[0].split('=')[1];
          const userChaseId = window.location.hash.split('?')[1].split('&')[1].split('=')[1];
          localtionParm(id, userChaseId);
        }
      
      }, (adminTime + 1) * 1000);
    } catch(e) {
    }
  });
  reduxTinker(fetchHandler, GET_LOTTERY_EXPECT, dispatch).start();
};

const localtionParm = (id, userChaseId) => {
  if(userChaseId === 'null') {
      getUserOrderInfo({ id });
  } else {
      getUserAddList({ id: userChaseId });
  }
}



/**
 *  获取上周盈亏
 * @type {String}
 */
export const GET_LAST_WEEK_STATISTIC = 'GET_LAST_WEEK_STATISTIC';
export const getLastWeekStatistic = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/lottery/getLastWeekStatistic.do`,
    {
      method: 'GET',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_LAST_WEEK_STATISTIC, dispatch).start();
};



/**
 *  获取本周盈亏
 * @type {String}
 */
export const GET_THIS_WEEK_STATISTIC = 'GET_THIS_WEEK_STATISTIC';
export const getThisWeekStatistic = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/lottery/getThisWeekStatistic.do`,
    {
      method: 'GET',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_THIS_WEEK_STATISTIC, dispatch).start();
};

/**
 *  获取今日投注
 * @type {String}
 */
export const FIND_USER_BET_LIST = 'FIND_USER_BET_LIST';
export const findUserBetList = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/bet/findUserBetList.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, FIND_USER_BET_LIST, dispatch).start();
};

/**
 *  获取用户资金信息
 * @type {String}
 */
export const GET_USER_CAPTIAL_INFO = 'GET_USER_CAPTIAL_INFO';
export const getUserCaptialInfo = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/getUserCaptialInfo.do`,
    {
      method: 'GET',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_USER_CAPTIAL_INFO, dispatch).start();
};


/**
 *  投注接口
 * @type {String}
 */
export const CHECK_PLAYKIND = 'CHECK_PLAYKIND';
export const checkPlayKind = (params) => {
  const param = { betJson: JSON.stringify(params)};
  const fetchHandler = new Tinker(
    `${APIURL}/web/check/playkind.do`,
    {
      method: 'POST',
    },
    param,
  ).success(result => {
    notification['success']({
        message: '投注成功',
    });
    findUserBetList({pageNo: 1, pageSize: 20, betTimeStart: moment().format('YYYY-MM-DD')});
    // 清空投注信息
    deleteNthPickData(-1);
    getUserCaptialInfo();
  });
  reduxTinker(fetchHandler, CHECK_PLAYKIND, dispatch).start();
}
/**
 *  获取用户投注详情
 * @type {String}
 */
export const GET_USER_ORDER_INFO = 'GET_USER_ORDER_INFO';
export const getUserOrderInfo = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/bet/findBetById.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_USER_ORDER_INFO, dispatch).start();
};

/**
 *  获取追号列表
 * @type {String}
 */
export const GET_USER_ADD_LIST = 'GET_USER_ADD_LIST';
export const getUserAddList = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/chase/findeById.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_USER_ADD_LIST, dispatch).start();
};

/**
 *  批量撤销追单
 * @type {String}
 */
export const ADD_BACK_BET = 'ADD_BACK_BET';
export const addBackBet = (params, params2) => {
  fetch(`${APIURL}/web/bet/addBackBet.do`, {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json; charset=UTF-8',
     "Accept": "application/json",
   },
   credentials: 'include',
   body: JSON.stringify(params)
  }).then(data => data.json())
  .then(res => {
    if (res.status === 0) {
      notification['success']({
        message: res.data,
      });
    } else {
      notification['error']({
        message: res.msg,
      });
    }
    getUserAddList({ id: params2.userChaseId });
  })
};

// 用户撤单 addBackBet1
export const ADD_BACK_BET_ONE = 'ADD_BACK_BET_ONE';
export const addBackBet1 = (params, params2) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/bet/backBetById.do`,
    {
      method: 'POST',
    },
    params,
  ).success(result => {
    notification['success']({
        message: '撤单成功',
    });
    getUserCaptialInfo();
    findUserBetList({ pageNo: 1, pageSize: 20, betTimeStart: moment().format('YYYY-MM-DD') });
    if(params2.id) {
      getUserOrderInfo({ id: params2.id });
    }
  }).failure(result => {
    notification['success']({
        message: '撤单失败',
    });
    getUserCaptialInfo();
    findUserBetList({ pageNo: 1, pageSize: 20, betTimeStart: moment().format('YYYY-MM-DD') });
    if(params2.id) {
      getUserOrderInfo({ id: params2.id });
    }
  });
  reduxTinker(fetchHandler, ADD_BACK_BET_ONE, dispatch).start();
};

/**
 * 选择投注号码，改变当前的选号
 * @type {String}
 */
export const CHANGE_SELECT_LOTTERY_NUMBERS = 'CHANGE_SELECT_LOTTERY_NUMBERS';
export const changeSelectLotteryNumbers = (numbers) => {
  dispatch({
    type: CHANGE_SELECT_LOTTERY_NUMBERS,
    payload: numbers,
  });
};

/**
 * 添加号码
 * @type {String}
 */
export const ADD_PICK_DATA = 'ADD_PICK_DATA';
export const addPickData = (params) => {
  dispatch({
    type: ADD_PICK_DATA,
    payload: params,
  });
}

/**
 * 清除某项选择的号码，index=-1时清除所有
 * @type {String}
 */
export const DELETE_NTH_PICK_DATA = 'DELETE_NTH_PICK_DATA';
export const deleteNthPickData = (index) => {
  dispatch({
    type: DELETE_NTH_PICK_DATA,
    payload: index,
  });
}


/**
 * 修改倍数
 * @type {String}
 */
export const UPDATE_BEISHU = 'UPDATE_BEISHU';
export const updateBeiShu = (params) => {
  dispatch({
    type: UPDATE_BEISHU,
    payload: params,
  });
}

/**
 * 修改模式
 * @type {String}
 */
export const UPDATE_MOSHI = 'UPDATE_MOSHI';
export const updateMoshi = (params) => {
  dispatch({
    type: UPDATE_MOSHI,
    payload: params,
  });
}

/**
 * 修改mode
 * @type {String}
 */
export const UPDATE_MODE = 'UPDATE_MODE';
export const updateMode = (params) => {
  dispatch({
    type: UPDATE_MODE,
    payload: params,
  });
}


/**
 * 修改最大反水和最小反水
 * @type {String}
 */
export const UPDATE_FANSHUI = 'UPDATE_FANSHUI';
export const updateFanshui = (params) => {
  dispatch({
    type: UPDATE_FANSHUI,
    payload: params,
  });
}

export const UPDATE_CLOSE = 'UPDATE_CLOSE';
export const updateBackBetClose = (params) => {
  dispatch({
    type: UPDATE_CLOSE,
    payload: params,
  });
}

// 积分兑换
export const POINTER_TO_MONEY = 'POINTER_TO_MONEY';
export const pointerToMoney = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/userCaptial/pointerToMoney.do`,
    {
      method: 'GET',
    },
    params,
  ).success(result => {
    notification['success']({
      message: result.msg,
    });
    getUserCaptialInfo();
  });
  reduxTinker(fetchHandler, POINTER_TO_MONEY, dispatch).start();
};

// 是否显示追号页面
export const UPDATE_ZHUIHAO_STATE = 'UPDATE_ZHUIHAO_STATE';
export const updateZhihaoState = (params) => {
  dispatch({
    type: UPDATE_ZHUIHAO_STATE,
    payload: params,
  });
}
