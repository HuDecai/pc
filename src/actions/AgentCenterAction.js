import { message, notification } from 'antd';
import Tinker from '../lib/tinker/src/index';
import reduxTinker from '../lib/tinker/src/reduxTinker';
import { dispatch } from '../store';
import { replace } from 'react-router-redux';

/**
 * 用户列表信息
 * @type {String}
 */
export const GET_USER_ANGET_LIST = 'GET_USER_ANGET_LIST';
export const getUserList = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/agentManagement/queryAgentManagement.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_USER_ANGET_LIST, dispatch).start();
};

/**
 * 团队列表信息
 * @type {String}
 */
export const GET_TEAM_ANGET_LIST = 'GET_TEAM_ANGET_LIST';
export const getTeamList = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/agentManagement/queryWebTeamStatistic.do`,
    {
      method: 'POST',
    },
    params,
  ).success(()=>{

  });
  reduxTinker(fetchHandler, GET_TEAM_ANGET_LIST, dispatch).start();
};

/**
 * 个人代理报表信息
 * @type {String}
 */
export const GET_GENREN_ANGET_LIST = 'GET_GENREN_ANGET_LIST';
export const getGenRenList = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/agentManagement/querySysStatistics.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_GENREN_ANGET_LIST, dispatch).start();
};

/**
 * 团队帐变报表信息
 * @type {String}
 */
export const GET_TEAM_ZHANGBIAN_LIST = 'GET_TEAM_ZHANGBIAN_LIST';
export const getTeamZhangBianList = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/agentManagement/queryUserDebt.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_TEAM_ZHANGBIAN_LIST, dispatch).start();
};

/**
 * 生成返点推广链接
 * @type {String}
 */
export const CREATE_TUIGUANG_LINK = 'CREATE_TUIGUANG_LINK';
export const createTuiguangLink = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/agentManagement/createPopularize.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, CREATE_TUIGUANG_LINK, dispatch).start();
};

/**
 * 生成无返点推广链接
 * @type {String}
 */
export const CREATE_NO_TUIGUANG_LINK = 'CREATE_NO_TUIGUANG_LINK';
export const createNoTuiguangLink = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/agentManagement/createPopularize.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, CREATE_NO_TUIGUANG_LINK, dispatch).start();
};

/**
 * 新增用户
 * @type {String}
 */
export const ADD_USER = 'ADD_USER';
export const addUser = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/agentManagement/addUser.do`,
    {
      method: 'POST',
    },
    params,
  ).success(result => {
    getUserList({ pageNo: 1, pageSize: 15 });
  });
  reduxTinker(fetchHandler, ADD_USER, dispatch).start();
};

/**
 * 修改下级返点
 * @type {String}
 */
export const UPDATE_LOWER_FANDIAN = 'UPDATE_LOWER_FANDIAN';
export const updateLowerFandian = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/agentManagement/updateLowerUserRebate.do`,
    {
      method: 'POST',
    },
    params.params,
  ).success(result => {
    notification['success']({
        message: '修改成功',
    });
    getUserList(params.searchData);
  });
  reduxTinker(fetchHandler, UPDATE_LOWER_FANDIAN, dispatch).start();
};
/**
 * 获取团队总余额
 * @type {String}
 */
export const TEAM_REMAINING = 'TEAM_REMAINING';
export const teamRemaining = (params) => {
    const fetchHandler = new Tinker(
        `${APIURL}/web/agentManagement/teamTotalMoney.do`,
        {
            method: 'GET',
        },
        params,
    ).success(result => {

    });
    reduxTinker(fetchHandler, TEAM_REMAINING, dispatch).start();
};
/**
 * 统计报表-总报表
 * @type {String}
 */
export const GENERAL_STATEMENT = 'GENERAL_STATEMENT';
export const getGeneralStatement = (params) => {
    const fetchHandler = new Tinker(
        `${APIURL}/web/agentManagement/queryAgentSumReport.do`,
        {
            method: 'GET',
        },
        params,
    ).success(result => {

    });
    reduxTinker(fetchHandler, GENERAL_STATEMENT, dispatch).start();
};
/**
 * 获取团队总人数
 * @type {String}
 */
export const TEAM_TOTAL_USER = 'TEAM_TOTAL_USER';
export const getTeamTotalUser = (params) => {
    const fetchHandler = new Tinker(
        `${APIURL}/web/agentManagement/teamTotalUser.do`,
        {
            method: 'GET',
        },
        params,
    ).success(result => {

    });
    reduxTinker(fetchHandler, TEAM_TOTAL_USER, dispatch).start();
};
/**
 * 获取团队彩票类
 * @type {String}
 */
export const LOTTERY_SUN_REPORT = 'LOTTERY_SUN_REPORT';
export const getLotterySumReport = (params) => {
    const fetchHandler = new Tinker(
        `${APIURL}/web/agentManagement/queryAgentLotterySumReport.do`,
        {
            method: 'GET',
        },
        params,
    ).success(result => {

    });
    reduxTinker(fetchHandler, LOTTERY_SUN_REPORT, dispatch).start();
};
/**
 * 获取团队香港彩总报表
 * @type {String}
 */
export const HK_SUM_REPORT = 'HK_SUM_REPORT';
export const getHkSumReport = (params) => {
    const fetchHandler = new Tinker(
        `${APIURL}/web/agentManagement/queryAgentHkSumReport.do`,
        {
            method: 'GET',
        },
        params,
    ).success(result => {

    });
    reduxTinker(fetchHandler, HK_SUM_REPORT, dispatch).start();
};
// 修改彩票返点列表
export const UPDATE_CAIPIAO_FANDIAN= 'UPDATE_CAIPIAO_FANDIAN';
export const updateCaipiaoFandian = (params) => {
  dispatch({
    type: UPDATE_CAIPIAO_FANDIAN,
    payload: params,
  });
}

// 修改香港彩返点列表
export const UPDATE_HONGKONG_FANDIAN = 'UPDATE_HONGKONG_FANDIAN';
export const updateHongKongFandian = (params) => {
  dispatch({
    type: UPDATE_HONGKONG_FANDIAN,
    payload: params,
  });
}

// 清除用户数据
export const CLEAR_USRE_DATA = 'CLEAR_USRE_DATA';
export const clearUserData = (params) => {
  dispatch({
    type: CLEAR_USRE_DATA,
    payload: params,
  });
}