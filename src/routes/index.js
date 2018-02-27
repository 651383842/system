import Vue from 'vue'
import Router from 'vue-router'

//陈志攀（start）
//***********************************学生*************************************************
/*import studentChangPassword from '../views/student/studentChangPasswordPage/studentChangPasswordPage.vue'
import studentLesson from '../views/student/studentLessonPage/studentLessonPage.vue'
import studentTeacher from '../views/student/studentTeacherPage/studentTeacherPage.vue'
import educationMessage from '../views/student/studentEducationMessagePage/studentEducationMessagePage.vue'
import studentInformation from '../views/student/studentInformationPage/studentInformationPage.vue'
import studentEvaluation from '../views/student/studentEvaluationPage/studentEvaluationPage.vue'
import studentTestInfo from '../views/student/studentTestInfoPage/studentTeacherPage.vue'*/
const studentChangPassword = resolve => require(['../views/student/studentChangPasswordPage/studentChangPasswordPage.vue'], resolve);
const studentLesson = resolve => require(['../views/student/studentLessonPage/studentLessonPage.vue'], resolve);
const studentTeacher = resolve => require(['../views/student/studentTeacherPage/studentTeacherPage.vue'], resolve);
const educationMessage = resolve => require(['../views/student/studentEducationMessagePage/studentEducationMessagePage.vue'], resolve);
const studentInformation = resolve => require(['../views/student/studentInformationPage/studentInformationPage.vue'], resolve);
const studentEvaluation = resolve => require(['../views/student/studentEvaluationPage/studentEvaluationPage.vue'], resolve);
const studentTestInfo = resolve => require(['../views/student/studentTestInfoPage/studentTeacherPage.vue'], resolve);
const studentGrade = resolve => require(['../views/student/inquireGradePage/inquireGradePage.vue'], resolve);
//***********************************教师*************************************************
//import teacherTestInfo from '../views/teacher/teacherTestInfoPage/teacherTestInfoPage.vue'
const teacherTestInfo = resolve => require(['../views/teacher/teacherTestInfoPage/teacherTestInfoPage.vue'], resolve);
//***********************************教务*************************************************
//import eduAdminManager from '../views/eduAdmin/eduAdminManagerPage/eduAdminManagerPage.vue'
const eduAdminManager = resolve => require(['../views/eduAdmin/eduAdminManagerPage/eduAdminManagerPage.vue'], resolve);
//陈志攀（end）

//吴坚（start）
/*import stInquireGrade from '../views/student/inquireGradePage/inquireGradePage.vue'
import eduAdminManageStd from '../views/eduAdmin/basicSettings/manageStdPage/manageStdPage.vue'
import eduAdminManageTch from '../views/eduAdmin/basicSettings/manageTchPage/manageTchPage.vue'
import eduAdminEduPlan from '../views/eduAdmin/eduManage/eduPlanPage/eduPlanPage.vue'
import eduAdminTeachProcess from '../views/eduAdmin/eduManage/teachProcessPage/teachProcessPage.vue'
import eduAdminTchTeachingPlan from '../views/eduAdmin/eduManage/tchTeachingPlanPage/tchTeachingPlanPage.vue'
import eduAdminManageClass from '../views/eduAdmin/eduManage/manageClassPage/manageClassPage.vue'
import eduAdminEvaTeachingResult from '../views/eduAdmin/eduManage/evaTeachingResultPage/evaTeachingResultPage.vue'
import eduAdminSupervisorManage from '../views/eduAdmin/eduManage/supervisorManagePage/supervisorManagePage.vue'
import eduAdminAuthorityManage2 from '../views/eduAdmin/userManage/authorityManage2Page/authorityManage2Page.vue'
import eduAdminManageGrade from '../views/eduAdmin/basicSettings/manageGradePage/manageGradePage.vue'*/
const stInquireGrade = resolve => require(['../views/student/inquireGradePage/inquireGradePage.vue'], resolve);
const eduAdminManageStd = resolve => require(['../views/eduAdmin/basicSettings/manageStdPage/manageStdPage.vue'], resolve);
const eduAdminManageTch = resolve => require(['../views/eduAdmin/basicSettings/manageTchPage/manageTchPage.vue'], resolve);
const eduAdminEduPlan = resolve => require(['../views/eduAdmin/eduManage/eduPlanPage/eduPlanPage.vue'], resolve);
const eduAdminTeachProcess = resolve => require(['../views/eduAdmin/eduManage/teachProcessPage/teachProcessPage.vue'], resolve);
const eduAdminTchTeachingPlan = resolve => require(['../views/eduAdmin/eduManage/tchTeachingPlanPage/tchTeachingPlanPage.vue'], resolve);
const eduAdminManageClass = resolve => require(['../views/eduAdmin/eduManage/manageClassPage/manageClassPage.vue'], resolve);
const eduAdminEvaTeachingResult = resolve => require(['../views/eduAdmin/eduManage/evaTeachingResultPage/evaTeachingResultPage.vue'], resolve);
const eduAdminSupervisorManage = resolve => require(['../views/eduAdmin/eduManage/supervisorManagePage/supervisorManagePage.vue'], resolve);
const eduAdminAuthorityManage2 = resolve => require(['../views/eduAdmin/userManage/authorityManage2Page/authorityManage2Page.vue'], resolve);
const eduAdminManageGrade = resolve => require(['../views/eduAdmin/basicSettings/manageGradePage/manageGradePage.vue'], resolve);
// 吴坚（end）

//李西炜（start）
import login from '../views/main/loginPage/loginPage.vue'
import eduAdminHome from '../views/main/eduAdminHomePage/eduAdminHomePage.vue'
import studentHome from '../views/main/studentHomePage/studentHomePage.vue'
/*import teacherHome from '../views/main/teacherHomePage/teacherHomePage.vue'
import forgetPassword from '../views/main/forgetPwPage/forgetPwPage.vue'
import resetForgetPassword from '../views/main/resetForgetPwPage/resetForgetPwPage.vue'
import combineCoursePage from '../views/eduAdmin/smartArrangeCourse/combineCoursePage/combineCoursePage.vue'
import checkCoursePage from '../views/eduAdmin/smartArrangeCourse/checkCoursePage/checkCoursePage.vue'
import adjustCouApplyPage from '../views/eduAdmin/smartArrangeCourse/adjustCouApplyPage/adjustCouApplyPage.vue'
import banCouApplyPage from '../views/eduAdmin/smartArrangeCourse/banCouApplyPage/banCouApplyPage.vue'
import couArrangeSettingPage from '../views/eduAdmin/smartArrangeCourse/couArrangeSettingPage/couArrangeSettingPage.vue'
import couArrangeTablePage from '../views/eduAdmin/smartArrangeCourse/couArrangeTablePage/couArrangeTablePage.vue'
import textbookMgmtPage from '../views/eduAdmin/basicSettings/textbookMgmtPage/textbookMgmtPage.vue'
import classroomMgmtPage from '../views/eduAdmin/basicSettings/classroomMgmtPage/classroomMgmtPage.vue'
import courseTypeMgmtPage from '../views/eduAdmin/basicSettings/courseTypeMgmtPage/courseTypeMgmtPage.vue'
import eduResGroupMgmtPage from '../views/eduAdmin/basicSettings/eduResGroupMgmtPage/eduResGroupMgmtPage.vue'
import suspendCouApplyPage from '../views/eduAdmin/smartArrangeCourse/suspendCouApplyPage/suspendCouApplyPage.vue'
import makeupCouApplyPage from '../views/eduAdmin/smartArrangeCourse/makeupCouApplyPage/makeupCouApplyPage.vue'
import stdStatusChangeExamPage from '../views/eduAdmin/basicSettings/stdStatusChangeExamPage/stdStatusChangeExam.vue'*/
//const login = resolve => require(['../views/main/loginPage/loginPage.vue'], resolve);
//const eduAdminHome = resolve => require(['../views/main/eduAdminHomePage/eduAdminHomePage.vue'], resolve);
//const teacherHome = resolve => require(['../views/main/teacherHomePage/teacherHomePage.vue'], resolve);
//const studentHome = resolve => require(['../views/main/studentHomePage/studentHomePage.vue'], resolve);
const forgetPassword = resolve => require(['../views/main/forgetPwPage/forgetPwPage.vue'], resolve);
const resetForgetPassword = resolve => require(['../views/main/resetForgetPwPage/resetForgetPwPage.vue'], resolve);
const combineCoursePage = resolve => require(['../views/eduAdmin/smartArrangeCourse/combineCoursePage/combineCoursePage.vue'], resolve);
const checkCoursePage = resolve => require(['../views/eduAdmin/smartArrangeCourse/checkCoursePage/checkCoursePage.vue'], resolve);
const adjustCouApplyPage = resolve => require(['../views/eduAdmin/smartArrangeCourse/adjustCouApplyPage/adjustCouApplyPage.vue'], resolve);
const banCouApplyPage = resolve => require(['../views/eduAdmin/smartArrangeCourse/banCouApplyPage/banCouApplyPage.vue'], resolve);
const couArrangeSettingPage = resolve => require(['../views/eduAdmin/smartArrangeCourse/couArrangeSettingPage/couArrangeSettingPage.vue'], resolve);
const couArrangeTablePage = resolve => require(['../views/eduAdmin/smartArrangeCourse/couArrangeTablePage/couArrangeTablePage.vue'], resolve);
const textbookMgmtPage = resolve => require(['../views/eduAdmin/basicSettings/textbookMgmtPage/textbookMgmtPage.vue'], resolve);
const classroomMgmtPage = resolve => require(['../views/eduAdmin/basicSettings/classroomMgmtPage/classroomMgmtPage.vue'], resolve);
const courseTypeMgmtPage = resolve => require(['../views/eduAdmin/basicSettings/courseTypeMgmtPage/courseTypeMgmtPage.vue'], resolve);
const eduResGroupMgmtPage = resolve => require(['../views/eduAdmin/basicSettings/eduResGroupMgmtPage/eduResGroupMgmtPage.vue'], resolve);
const suspendCouApplyPage = resolve => require(['../views/eduAdmin/smartArrangeCourse/suspendCouApplyPage/suspendCouApplyPage.vue'], resolve);
const makeupCouApplyPage = resolve => require(['../views/eduAdmin/smartArrangeCourse/makeupCouApplyPage/makeupCouApplyPage.vue'], resolve);
const stdStatusChangeExamPage = resolve => require(['../views/eduAdmin/basicSettings/stdStatusChangeExamPage/stdStatusChangeExam.vue'], resolve);
//李西炜（end）


//易倩（start）
/*import  teachingPlan from '../views/teacher/teachingPlanPage/teachingPlanPage.vue'
import teachingEvaluate from'../views/teacher/teachingEvaluatePage/teachingEvaluatePage.vue'
import stopClass from'../views/teacher/stopClassPage/stopClassPage.vue'
import research from'../views/teacher/researchPage/researchPage.vue'
import requirement from'../views/teacher/requirementPage/requirementPage.vue'
import passwdChange from '../views/teacher/passwdChangePage/passwdChangePage.vue'
import messageNotice from '../views/teacher/messageNoticePage/messageNoticePage.vue'
import makeupClass from'../views/teacher/makeupClassPage/makeupClassPage.vue'
import experience from'../views/teacher/experiencePage/experiencePage.vue'
import educationManege from'../views/teacher/educationManegePage/educationManegePage.vue'
import director from'../views/teacher/directorPage/directorPage.vue'
import directorResult from'../views/teacher/directorResultPage/directorResultPage.vue'
//import directorResultList from'../views/teacher/directorResultListPage/directorResultListPage.vue'
import classManege from'../views/teacher/classManegePage/classManegePage.vue'
import classList from '../views/teacher/classListPage/classListPage.vue'
import certificateManege from '../views/teacher/certificateManegePage/certificateManegePage.vue'
import basicMessage from '../views/teacher/basicMessagePage/basicMessagePage.vue'
import studentMessage from '../views/teacher/studentMessagePage/studentMessagePage.vue'
import checkStudentInfo from '../views/teacher/checkStudentInfoPage/checkStudentInfoPage.vue'*/
const  teachingPlan = resolve => require(['../views/teacher/teachingPlanPage/teachingPlanPage.vue'], resolve);
const teachingEvaluate = resolve => require(['../views/teacher/teachingEvaluatePage/teachingEvaluatePage.vue'], resolve);
const stopClass = resolve => require(['../views/teacher/stopClassPage/stopClassPage.vue'], resolve);
const research = resolve => require(['../views/teacher/researchPage/researchPage.vue'], resolve);
const requirement = resolve => require(['../views/teacher/requirementPage/requirementPage.vue'], resolve);
const passwdChange = resolve => require(['../views/teacher/passwdChangePage/passwdChangePage.vue'], resolve);
const messageNotice = resolve => require(['../views/teacher/messageNoticePage/messageNoticePage.vue'], resolve);
const makeupClass = resolve => require(['../views/teacher/makeupClassPage/makeupClassPage.vue'], resolve);
const experience = resolve => require(['../views/teacher/experiencePage/experiencePage.vue'], resolve);
const educationManege = resolve => require(['../views/teacher/educationManegePage/educationManegePage.vue'], resolve);
//const directorResultList = resolve => require(['../views/teacher/directorResultListPage/directorResultListPage.vue'], resolve);
const classManege = resolve => require(['../views/teacher/classManegePage/classManegePage.vue'], resolve);
const classList = resolve => require(['../views/teacher/classListPage/classListPage.vue'], resolve);
const certificateManege = resolve => require(['../views/teacher/certificateManegePage/certificateManegePage.vue'], resolve);
const basicMessage = resolve => require(['../views/teacher/basicMessagePage/basicMessagePage.vue'], resolve);
const studentMessage = resolve => require(['../views/teacher/studentMessagePage/studentMessagePage.vue'], resolve);
const checkStudentInfo = resolve => require(['../views/teacher/checkStudentInfoPage/checkStudentInfoPage.vue'], resolve);
const teacherDirector = resolve => require(['../views/teacher/teacherDirectorPage/teacherDirectorPage.vue'], resolve);
const teacherDirectorResult = resolve => require(['../views/teacher/teacherdirectorResultPage/teacherdirectorResultPage.vue'], resolve);
const directorDirector = resolve => require(['../views/teacher/directorPage/directorPage.vue'], resolve);
const directorResult = resolve => require(['../views/teacher/directorResultPage/directorResultPage.vue'], resolve);
//易倩（end）

//蔡玲双（strat）
// *******************eduAdmin***********************************
// markManage
/*import adminCancelGrade from '../views/eduAdmin/markManage/adminCancelGradePage/adminCancelGradePage.vue'
import gradeQuery from '../views/eduAdmin/markManage/gradeQueryPage/gradeQueryPage.vue'
import gradeStat from '../views/eduAdmin/markManage/gradeStatPage/gradeStatPage.vue'
import makeupExamAdmin from '../views/eduAdmin/markManage/makeupExamAdminPage/makeupExamAdminPage.vue'
import makeupGradeInput from '../views/eduAdmin/markManage/makeupGradeInputPage/makeupGradeInputPage.vue'
import salary from '../views/eduAdmin/tchSalary/salaryPage/salaryPage.vue'
import setPrice from '../views/eduAdmin/tchSalary/setPricePage/setPricePage.vue'
import authorityMgmt1 from '../views/eduAdmin/userManage/authorityMgmt1Page/authorityMgmt1Page.vue'
import noticeManage from '../views/eduAdmin/notice/noticeMgmtPage/noticeManage.vue'
import noticeSetting from '../views/eduAdmin/notice/noticeSettingPage/noticeSetting.vue'
import notifyInformation from '../views/eduAdmin/notice/notifyInformationPage/notifyInformationPage.vue'*/
const adminCancelGrade = resolve => require(['../views/eduAdmin/markManage/adminCancelGradePage/adminCancelGradePage.vue'], resolve);
const gradeQuery = resolve => require(['../views/eduAdmin/markManage/gradeQueryPage/gradeQueryPage.vue'], resolve);
const gradeStat = resolve => require(['../views/eduAdmin/markManage/gradeStatPage/gradeStatPage.vue'], resolve);
const makeupExamAdmin = resolve => require(['../views/eduAdmin/markManage/makeupExamAdminPage/makeupExamAdminPage.vue'], resolve);
const makeupGradeInput = resolve => require(['../views/eduAdmin/markManage/makeupGradeInputPage/makeupGradeInputPage.vue'], resolve);
const salary = resolve => require(['../views/eduAdmin/tchSalary/salaryPage/salaryPage.vue'], resolve);
const setPrice = resolve => require(['../views/eduAdmin/tchSalary/setPricePage/setPricePage.vue'], resolve);
const authorityMgmt1 = resolve => require(['../views/eduAdmin/userManage/authorityMgmt1Page/authorityMgmt1Page.vue'], resolve);
const noticeManage = resolve => require(['../views/eduAdmin/notice/noticeMgmtPage/noticeManage.vue'], resolve);
const noticeSetting = resolve => require(['../views/eduAdmin/notice/noticeSettingPage/noticeSetting.vue'], resolve);
const notifyInformation = resolve => require(['../views/eduAdmin/notice/notifyInformationPage/notifyInformationPage.vue'], resolve);
// *******************main***********************************
//import eduAdminHomePage from '../views/main/eduAdminHomePage/eduAdminHomePage.vue'
// const eduAdminHomePage = resolve => require(['../views/main/eduAdminHomePage/eduAdminHomePage.vue'], resolve);
// *******************teacher***********************************
/*import tchCheckTimetable from '../views/teacher/tchCheckTimetablePage/tchCheckTimetablePage.vue'
import courseList from '../views/teacher/courseListPage/courseListPage.vue'
import gradesInput from '../views/teacher/gradesInputPage/gradesInputPage.vue'
import normalSchedule from '../views/teacher/normalSchedulePage/normalSchedulePage.vue'
import tchGradesInput from '../views/teacher/tchGradesInputPage/tchGradesInputPage.vue'
import tchManuAdjCl from '../views/teacher/tchManuAdjClPage/tchManuAdjClPage.vue'
import tchCheckSalary from '../views/teacher/tchCheckSalaryPage/tchCheckSalaryPage.vue'
import scheduleList from '../views/eduAdmin/tchSalary/scheduleListPage/scheduleListPage.vue'
import seeSigninList from '../views/eduAdmin/tchSalary/seeSigninListPage/seeSigninListPage.vue'
import tchSignin from '../views/teacher/tchSigninPage/tchSigninPage.vue'*/
const tchCheckTimetable = resolve => require(['../views/teacher/tchCheckTimetablePage/tchCheckTimetablePage.vue'], resolve);
const courseList = resolve => require(['../views/teacher/courseListPage/courseListPage.vue'], resolve);
const gradesInput = resolve => require(['../views/teacher/gradesInputPage/gradesInputPage.vue'], resolve);
const normalSchedule = resolve => require(['../views/teacher/normalSchedulePage/normalSchedulePage.vue'], resolve);
const tchGradesInput = resolve => require(['../views/teacher/tchGradesInputPage/tchGradesInputPage.vue'], resolve);
const tchManuAdjCl = resolve => require(['../views/teacher/tchManuAdjClPage/tchManuAdjClPage.vue'], resolve);
const tchCheckSalary = resolve => require(['../views/teacher/tchCheckSalaryPage/tchCheckSalaryPage.vue'], resolve);
const scheduleList = resolve => require(['../views/eduAdmin/tchSalary/scheduleListPage/scheduleListPage.vue'], resolve);
const seeSigninList = resolve => require(['../views/eduAdmin/tchSalary/seeSigninListPage/seeSigninListPage.vue'], resolve);
const tchSignin = resolve => require(['../views/teacher/tchSigninPage/tchSigninPage.vue'], resolve);
const seeScore = resolve => require(['../views/teacher/classListPage/courseScorePage.vue'], resolve);
const tchseeScore = resolve => require(['../views/eduAdmin/markManage/tchSeeScore/scorePage.vue'], resolve);

//蔡玲双（end）

Vue.use(Router);

export default new Router({   //将routes里的参数导出

  routes: [
    {
      path: '/',   //这里只用'/'，即为默认路径
      name: '',
      component: login
    },
    //*******************************************************************（陈志攀start）
    {
      //学生密码修改
      path: '/student/setting/changPassword',
      name: 'studentChangPassword',
      component: studentChangPassword
    },
    /*
    {
      //学生通知信息
      path: '/student/query/educationMessage',
      name: 'educationMessage',
      component: educationMessage
    },
    */
    {
      //学生课表查询
      path: '/student/query/studentLesson',
      name: 'studentLesson',
      component: studentLesson
    },
    {
      //学生查看教师
      path: '/student/query/studentTeacher',
      name: 'studentTeacher',
      component: studentTeacher
    },
    {
      //学生个人信息
      path: '/student/setting/studentInformation',
      name: 'studentInformation',
      component: studentInformation
    },
    {
      //学生评教界面
      path: '/student/studentEvaluation',
      name: 'studentEvaluation',
      component: studentEvaluation
    },
    {
      //学生考场查询
      path: '/student/query/studentTestInfo',
      name: 'studentTestInfo',
      component: studentTestInfo
    },
    {
      //教师查看考场
      path: '/teacher/teach/teacherTestInfo',
      name: 'teacherTestInfo',
      component: teacherTestInfo
    },
    {
      //考务管理界面
      path: '/eduAdmin/eduAdminManage',
      name: 'eduAdminManager',
      component: eduAdminManager
    },
    {
      //学生成绩查询界面
      path: '/student/query/stInquireGrade',
      name: 'studentGrade',
      component:studentGrade
    },
    //*******************************************************************（陈志攀end）
      //*******************************************************************（吴坚start）
    {
      //学生管理界面
      path: '/eduAdmin/person/eduAdminManageStd',
      name: 'eduAdminManageStd',
      component: eduAdminManageStd
    },
    {
      //教师管理界面
      path: '/eduAdmin/person/eduAdminManageTch',
      name: 'eduAdminManageTch',
      component: eduAdminManageTch
    },
    {
      //培养方案界面
      path: '/eduAdmin/plan/eduAdminEduPlan',
      name: 'eduAdminEduPlan',
      component: eduAdminEduPlan
    },
    {
      //教学进程界面
      path: '/eduAdmin/plan/eduAdminTeachProcess',
      name: 'eduAdminTeachProcess',
      component: eduAdminTeachProcess
    },
    {
      //教师教学计划界面
      path: '/eduAdmin/examination/eduAdminTchTeachingPlan',
      name: 'eduAdminTchTeachingPlan',
      component: eduAdminTchTeachingPlan
    },
    {
      //学生异动情况界面
      path: '/eduAdmin/person/eduAdminManageClass',
      name: 'eduAdminManageClass',
      component: eduAdminManageClass
    },
    {
      //评教结果界面
      path: '/eduAdmin/examination/eduAdminEvaTeachingResult',
      name: 'eduAdminEvaTeachingResult',
      component: eduAdminEvaTeachingResult
    },
    {
      //教务管理督导界面
      path: '/eduAdmin/eduAdminSupervisorManage',
      name: 'eduAdminSupervisorManage',
      component: eduAdminSupervisorManage
    },
    {
      //权限设置界面
      path: '/eduAdmin/role/eduAdminAuthorityManage2',
      name: 'eduAdminAuthorityManage2',
      component: eduAdminAuthorityManage2
    },
    {
      //年级管理界面
      path: '/eduAdmin/resource/eduAdminManageGrade',
      name: 'eduAdminManageGrade',
      component: eduAdminManageGrade
    },

    //*******************************************************************（吴坚end）
    //*******************************************************************（李西炜start）
    {
      //教务教师首页界面
      path: '/login/main/eduAdminHome',
      name: '/login/main/eduAdminHome',
      component: eduAdminHome
    },
    /*
    {
      //教师首页界面
      path: '/login/main/teacherHome',
      name: '/login/main/teacherHome',
      component: teacherHome
    },
    */
    {
      //学生首页界面
      path: '/login/main/studentHome',
      name: '/login/main/studentHome',
      component: studentHome
    },
    {
      path: '/eduAdmin/checkCourse',
      name: '/eduAdmin/checkCourse',
      component: checkCoursePage
      //  教务查看全校课表页面
    },
    {
      path: '/eduAdmin/examination/adjustCouApply',
      name: '/eduAdmin/examination/adjustCouApply',
      component: adjustCouApplyPage
      //  教务调课审批页面
    },
    {
      path: '/login',
      name: '/login',
      component: login
      //  登录页面
    },
    {
      path: '/login/operation/forgetPassword',
      name: '/login/operation/forgetPassword',
      component: forgetPassword
      //  忘记密码找回页面
    },
    {
      path: '/login/operation/resetForgetPassword',
      name: '/login/operation/resetForgetPassword',
      component: resetForgetPassword
      //  忘记密码重置页面
    },
    {
      path: '/eduAdmin/course/combineCourse',
      name: '/eduAdmin/course/combineCourse',
      component: combineCoursePage
      //  教务员合课设置界面
    },
    {
      path: '/eduAdmin/examination/banCouApply',
      name: '/eduAdmin/examination/banCouApply',
      component: banCouApplyPage
      //  禁排审批页面
    },
    {
      path: '/eduAdmin/course/couArrangeSetting',
      name: '/eduAdmin/course/couArrangeSetting',
      component: couArrangeSettingPage
      //  排课课程设置页面
    },
    {
      path: '/eduAdmin/course/couArrangeTable',
      name: '/eduAdmin/course/couArrangeTable',
      component: couArrangeTablePage
      //  排课执行页面
    },
    {
      path: '/eduAdmin/resource/textbookMgmt',
      name: '/eduAdmin/resource/textbookMgmt',
      component: textbookMgmtPage
      //  教材管理页面
    },
    {
      path: '/eduAdmin/resource/classroomMgmt',
      name: '/eduAdmin/resource/classroomMgmt',
      component: classroomMgmtPage
      //  教室管理页面
    },
	{
      path: '/eduAdmin/resource/courseTypeMgmt',
      name: '/eduAdmin/resource/courseTypeMgmt',
      component: courseTypeMgmtPage
      //  课程类型管理页面
    },
    {
      path: '/eduAdmin/person/eduResGroupMgmt',
      name: '/eduAdmin/person/eduResGroupMgmt',
      component: eduResGroupMgmtPage
      //  教研组管理页面

    },
    {
      path: '/eduAdmin/person/eduAdminManageClass/stdStatusChangeExam',
      name: '/eduAdmin/person/eduAdminManageClass/stdStatusChangeExam',
      component: stdStatusChangeExamPage
      //  异动审批页面
    },
    {

      path: '/eduAdmin/examination/suspendCouApply',
      name: '/eduAdmin/examination/suspendCouApply',
      component: suspendCouApplyPage
      //  停课审批页面
    },
    {
      path: '/eduAdmin/examination/makeupCouApply',
      name: '/eduAdmin/examination/makeupCouApply',
      component: makeupCouApplyPage
      //  补课审批页面
    },
    //*******************************************************************（李西炜end）

        //*******************************************************************（易倩start）
    {
      //管理教研组
      path: '/teacher/group/research',
      component: research
    },
    {
      //审批教学计划
      path: '/teacher/group/eduAdminTchTeachingPlan',
      component: teachingPlan
    },
    {//申请补课
      path: '/teacher/course/makeupClass',
      component:  makeupClass
    },
    {
      //停课申请
      path: '/teacher/course/stopClass',
      component:stopClass
    },
    {
      //禁排申请
      path: '/teacher/course/requirement',
      component:requirement
    },

    {
      //查看评教
      path: '/teacher/teach/teachingEvaluate',
      component: teachingEvaluate
    },
	{
	    //教师查看学生评教留言
      path: '/teacher/studentMessage',
      component:studentMessage
    },
    {
	    //班主任 班级列表
      path: '/teacher/classList',
      component:classList
    },
    {
      //班主任 结业成绩
      path: '/teacher/seeScore',
      component:seeScore
    },
    {
      //教务 结业成绩
      path: '/eduAdmin/gradeManage/seeScore',
      component:tchseeScore
    },
    //教师查看督导结果列表**************
    {
      path: '/teacher/teach/teacherDirector',
      component:teacherDirector
    },
    {//教师查看督导结果列表的跳转********************
      path:'/teacher/teach/directorResult',
      component:teacherDirectorResult
    },
    {
      //督导员反馈***********************************
      path: '/teacher/director',
      component:directorDirector
    },
    {
      //督导员填写反馈结果  前一个页面的跳转**********************
      path: '/teacher/directorResult',
      component:directorResult
    },
    {
	    //班主任查看学生个人信息
      path: '/teacher/class/checkStudentInfo',
      component:checkStudentInfo
    },
    {
      //密码修改
      path: '/teacher/info/passwdChange',
      component:passwdChange
    },
    /*
    {
      path: '/teacher/teach/messageNotice',
      component:  messageNotice
    },

    */
    {//教师基本信息
      path: '/teacher/personInfo/basicMessage',
      component:basicMessage
    },
    {//教师经历
      path: '/teacher/info/experience',
      component:experience
    },
    {//教育管理
      path: '/teacher/info/educationManege',
      component:educationManege
    },
    /*
    {
      path:'/teacher/directorResultList',
      component:directorResultList
    },

    */
    {//证书管理
      path: '/teacher/info/certificateManege',
      component:certificateManege
    },
    //******************************************************************（易倩end)

    //******************************************************************（蔡玲双start）
    //eduAdmin
    {
      // 教务-管理员撤销成绩
      path: '/eduAdmin/gradeManage/adminCancelGrade',
      name: 'adminCancelGrade',
      component: adminCancelGrade
    },
    {
      // 教务-成绩查询（学号查询）
      path: '/eduAdmin/gradeManage/gradeQuery',
      name: 'gradeQuery',
      component: gradeQuery
    },
    {
      // 教务-成绩统计（分数段查询）
      path: '/eduAdmin/gradeManage/gradeStat',
      name: 'gradeStat',
      component: gradeStat
    },
    {
      // 教务-补考成绩管理
      path: '/eduAdmin/examination/makeupExamAdmin',
      name: 'makeupExamAdmin',
      component: makeupExamAdmin
    },
    {
      // 教务-补考成绩输入
      path: '/eduAdmin/gradeManage/makeupGradeInput',
      name: 'makeupGradeInput',
      component: makeupGradeInput
    },
    {
      // 教务-薪酬单
      path: '/eduAdmin/emolument/salary',
      name: 'salary',
      component: salary
    },
    {
      // 教务-设置单价
      path: '/eduAdmin/emolument/setPrice',
      name: 'setPrice',
      component: setPrice
    },
    {
      // 教务-权限管理1（角色管理）
      path: '/eduAdmin/role/authorityMgmt1',
      name: 'authorityMgmt1',
      component: authorityMgmt1
    },
    {
      // 教务-公告管理
      path: '/eduAdmin/information/noticeManage',
      name: 'noticeManage',
      component: noticeManage
    },
    {
      // 教务-公告编辑
      path: '/eduAdmin/information/noticeSetting',
      name: 'noticeSetting',
      component: noticeSetting
    },
    {
      // 教务-公告详细
      path: '/eduAdmin/information/notifyInformation',
      name: 'notifyInformation',
      component: notifyInformation
    },
	{
		// 教务-管理教师上课列表
		path: '/eduAdmin/emolument/scheduleList',
		name: 'scheduleList',
		component: scheduleList
	},
	{
		// 教务-管理教师签到
		path: '/eduAdmin/emolument/seeSigninList',
		name: 'seeSigninList',
		component: seeSigninList
	},



    // teacher
    {
      // 教师-查看教师课表
      path: '/teacher/course/tchCheckTimetable',
      name: 'tchCheckTimetable',
      component: tchCheckTimetable
    },
    {
      // 教师-查看个人薪酬单
      path: '/teacher/classInfo/tchCheckSalary',
      name: 'tchCheckSalary',
      component: tchCheckSalary
    },
    {
      // 教师-教学计划
      path: '/teacher/teach/courseList',
      name: 'courseList',
      component: courseList
    },
    {
      // 教师-上课签到课程表
      path: '/teacher/teach/normalSchedule',
      name: 'normalSchedule',
      component: normalSchedule
    },
	{
	  // 教师-上课签到页面
	  path: '/teacher/teach/tchSignin',
	  name: 'tchSignin',
	  component: tchSignin
	},
    {
      // 教师-正考成绩输入
      path: '/teacher/class/gradesInput',
      name: 'gradesInput',
      component: gradesInput
    },
    {
      // 教师-成绩录入
      path: '/teacher/class/tchGradesInput',
      name: 'tchGradesInput',
      component: tchGradesInput
    },
    {
      // 教师-调课申请
      path: '/teacher/course/tchManuAdjCl',
      name: 'tchManuAdjCl',
      component: tchManuAdjCl
    }

    //******************************************************************（蔡玲双end）
  ]
})
