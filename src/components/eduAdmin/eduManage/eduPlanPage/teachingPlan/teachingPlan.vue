<template>
  <div id="tchingPlan" style="padding: 0.6rem 5rem;background-color: #f3f3f3">
    <div>
      <span>※操作指南：点击相应的课程编号进行删除操作，点击相应的课程名称进行编辑操作</span>
      <div class="yearsTypeDiv">
        <span class="yearsTypeP">5年制培养方案</span>
        <span><button class="yearButton" @click="downloadFormClick">下载模板</button></span>
      </div>
      <!--年制栏-->
      <div>
        <div v-for="(grade,gradeIndex) in gradeIdArr">
          <div v-if="grade.yearType=='5'" :id="'5GradePlanDiv' + gradeIndex" class="gradePlanDiv">
            <span><img :id="'5Arrow' + gradeIndex" class="gradePlanImg" @click="tableSlideToggle(grade.yearType,gradeIndex,grade.gradeName)" :src="arrowright"></span>
            <span :id="'5P' + gradeIndex" class="gradePlanP" @click="tableSlideToggle(grade.yearType,gradeIndex,grade.gradeName)">{{grade.gradeName}}级</span>
            <span><button class="gradeButton" @click="downloadClick(grade.gradeName+grade.yearType)">下载</button></span>
            <span style="display: inline-block;float: right;margin-bottom: 0.3rem">
              <Upload
                ref="upload"
                :data="{'gradeId':grade.gradeName+grade.yearType}"
                :show-upload-list = false
                :format="['xls','xlsx']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleSizeError"
                :on-success="handleSuccess"
                :on-error="handleError"
                action="./schoolCoursePlan/importExcel">
                <!--:on-progress="handleProgress"-->
                <button type="ghost" id="leadIn" class="gradeButton">上传</button>
              </Upload>
              <!--上传的data数据用对象传输-->
            </span>
            <span><button class="gradeButton" @click="cVclick(gradeIndex)">粘贴</button></span>
            <span><button class="gradeButton" @click="cCclick(gradeIndex)">复制</button></span>
            <span><button class="gradeButton" @click="addCourse(gradeIndex)">新增</button></span>
          </div>
          <!--年级教学进程下拉菜单-->
          <div v-if="grade.yearType==='5'" :id="'5Table' + gradeIndex" style="display: none">
            <table :id="'5Tables' + gradeIndex" class="normalTable" style="table-layout: fixed">
              <thead>
              <tr>
                <th width="6%" rowspan="3">课程编号</th>
                <th width="6%" rowspan="3">课程类别</th>
                <th width="6%" rowspan="3">课程名称</th>
                <th width="12%" rowspan="2" colspan="3">学时</th>
                <th width="64%" colspan="20">执行学期</th>
                <th width="6%" rowspan="2" colspan="2">考核学期</th>
              </tr>
              <tr>
                <td colspan="2">1</td>
                <td colspan="2">2</td>
                <td colspan="2">3</td>
                <td colspan="2">4</td>
                <td colspan="2">5</td>
                <td colspan="2">6</td>
                <td colspan="2">7</td>
                <td colspan="2">8</td>
                <td colspan="2">9</td>
                <td colspan="2">10</td>
              </tr>
              <tr>
                <td>总计</td>
                <td>理论</td>
                <td>实践</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>考查</td>
                <td>考试</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(course,index) in courseAllList[gradeIndex].courseList">
                <td v-text="course.courseId" @click="deleteCourse(gradeIndex,index)" @mousemove="mousemove($event)" @mouseout="mouseout($event)" title="点击删除" style="cursor:pointer"></td>
                <td v-text="course.courseTypeName"></td>
                <td v-text="course.courseName" @click="editCourse(gradeIndex,index)" @mousemove="mousemove($event)" @mouseout="mouseout($event)" title="点击编辑" style="cursor:pointer"></td>
                <td v-text="course.totalHours"></td>
                <td v-text="course.theoryHours"></td>
                <td v-text="course.practice"></td>
                <td>
                  <span v-if="course.term1st == 0"></span>
                  <span v-else>{{course.term1st}}</span>
                </td>
                <td>
                  <span v-if="course.term1nd == 0"></span>
                  <span v-else>{{course.term1nd}}</span>
                </td>
                <td>
                  <span v-if="course.term2st == 0"></span>
                  <span v-else>{{course.term2st}}</span>
                </td>
                <td>
                  <span v-if="course.term2nd == 0"></span>
                  <span v-else>{{course.term2nd}}</span>
                </td>
                <td>
                  <span v-if="course.term3st == 0"></span>
                  <span v-else>{{course.term3st}}</span>
                </td>
                <td>
                  <span v-if="course.term3nd == 0"></span>
                  <span v-else>{{course.term3nd}}</span>
                </td>
                <td>
                  <span v-if="course.term4st == 0"></span>
                  <span v-else>{{course.term4st}}</span>
                </td>
                <td>
                  <span v-if="course.term4nd == 0"></span>
                  <span v-else>{{course.term4nd}}</span>
                </td>
                <td>
                  <span v-if="course.term5st == 0"></span>
                  <span v-else>{{course.term5st}}</span>
                </td>
                <td>
                  <span v-if="course.term5nd == 0"></span>
                  <span v-else>{{course.term5nd}}</span>
                </td>
                <td>
                  <span v-if="course.term6st == 0"></span>
                  <span v-else>{{course.term6st}}</span>
                </td>
                <td>
                  <span v-if="course.term6nd == 0"></span>
                  <span v-else>{{course.term6nd}}</span>
                </td>
                <td>
                  <span v-if="course.term7st == 0"></span>
                  <span v-else>{{course.term7st}}</span>
                </td>
                <td>
                  <span v-if="course.term7nd == 0"></span>
                  <span v-else>{{course.term7nd}}</span>
                </td>
                <td>
                  <span v-if="course.term8st == 0"></span>
                  <span v-else>{{course.term8st}}</span>
                </td>
                <td>
                  <span v-if="course.term8nd == 0"></span>
                  <span v-else>{{course.term8nd}}</span>
                </td>
                <td>
                  <span v-if="course.term9st == 0"></span>
                  <span v-else>{{course.term9st}}</span>
                </td>
                <td>
                  <span v-if="course.term9nd == 0"></span>
                  <span v-else>{{course.term9nd}}</span>
                </td>
                <td>
                  <span v-if="course.term10st == 0"></span>
                  <span v-else>{{course.term10st}}</span>
                </td>
                <td>
                  <span v-if="course.term10nd == 0"></span>
                  <span v-else>{{course.term10nd}}</span>
                </td>
                <td v-text="course.checkSemesters"></td>
                <td v-text="course.examSemesters"></td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--课程信息table-->
        </div>
      </div>
    </div>
    <!--5年制培养方案-->
    <div>
      <div class="yearsTypeDiv">
        <!--年制模块下拉菜单-->
        <span class="yearsTypeP">3年制培养方案</span>
        <span><button class="yearButton" @click="downloadFormClick">下载模板</button></span>
      </div>

      <div>
        <div v-for="(grade,gradeIndex) in gradeIdArr">
          <div v-if="grade.yearType==='3'" :id="'3GradePlanDiv' + gradeIndex" class="gradePlanDiv">
            <span><img :id="'3Arrow' + gradeIndex" class="gradePlanImg" @click="tableSlideToggle(grade.yearType,gradeIndex,grade.gradeName)" :src="arrowright"></span>
            <span :id="'3P' + gradeIndex" class="gradePlanP" @click="tableSlideToggle(grade.yearType,gradeIndex,grade.gradeName)">{{grade.gradeName}}级</span>
            <span><button class="gradeButton" @click="downloadClick(grade.gradeName+grade.yearType)">下载</button></span>
            <span style="display: inline-block;float: right;margin-bottom: 0.3rem">
              <Upload
                ref="upload"
                :data="{'gradeId':grade.gradeName+grade.yearType}"
                :show-upload-list = false
                :format="['xls','xlsx']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleSizeError"
                :on-success="handleSuccess"
                :on-error="handleError"
                action="./schoolCoursePlan/importExcel">
                <!--:on-progress="handleProgress"-->
                <button type="ghost" id="leadIn" class="gradeButton">上传</button>
              </Upload>
            </span>
            <span><button class="gradeButton" @click="cVclick(gradeIndex)">粘贴</button></span>
            <span><button class="gradeButton" @click="cCclick(gradeIndex)">复制</button></span>
            <span><button class="gradeButton" @click="addCourse(gradeIndex)">新增</button></span>
          </div>
          <!--年级教学进程下拉菜单-->
          <div v-if="grade.yearType==='3'" :id="'3Table' + gradeIndex" style="display: none">
            <table :id="'3Tables' + gradeIndex" class="normalTable" style="table-layout: fixed">
              <thead>
              <tr>
                <th width="6%" rowspan="3">课程编号</th>
                <th width="6%" rowspan="3">课程类别</th>
                <th width="6%" rowspan="3">课程名称</th>
                <th width="12%" rowspan="2" colspan="3">学时</th>
                <th width="64%" colspan="20">执行学期</th>
                <th width="6%" rowspan="2" colspan="2">考核学期</th>
              </tr>
              <tr>
                <td colspan="2">1</td>
                <td colspan="2">2</td>
                <td colspan="2">3</td>
                <td colspan="2">4</td>
                <td colspan="2">5</td>
                <td colspan="2">6</td>
                <td colspan="2">7</td>
                <td colspan="2">8</td>
                <td colspan="2">9</td>
                <td colspan="2">10</td>
              </tr>
              <tr>
                <td>总计</td>
                <td>理论</td>
                <td>实践</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>前9周</td>
                <td>后9周</td>
                <td>考查</td>
                <td>考试</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(course,index) in courseAllList[gradeIndex].courseList">
                <td v-text="course.courseId" @click="deleteCourse(gradeIndex,index)" @mousemove="mousemove($event)" @mouseout="mouseout($event)" title="点击删除" style="cursor:pointer"></td>
                <td v-text="course.courseTypeName"></td>
                <td v-text="course.courseName" @click="editCourse(gradeIndex,index)" @mousemove="mousemove($event)" @mouseout="mouseout($event)" title="点击编辑" style="cursor:pointer"></td>
                <td v-text="course.totalHours"></td>
                <td v-text="course.theoryHours"></td>
                <td v-text="course.practice"></td>
                <td>
                  <span v-if="course.term1st == 0"></span>
                  <span v-else>{{course.term1st}}</span>
                </td>
                <td>
                  <span v-if="course.term1nd == 0"></span>
                  <span v-else>{{course.term1nd}}</span>
                </td>
                <td>
                  <span v-if="course.term2st == 0"></span>
                  <span v-else>{{course.term2st}}</span>
                </td>
                <td>
                  <span v-if="course.term2nd == 0"></span>
                  <span v-else>{{course.term2nd}}</span>
                </td>
                <td>
                  <span v-if="course.term3st == 0"></span>
                  <span v-else>{{course.term3st}}</span>
                </td>
                <td>
                  <span v-if="course.term3nd == 0"></span>
                  <span v-else>{{course.term3nd}}</span>
                </td>
                <td>
                  <span v-if="course.term4st == 0"></span>
                  <span v-else>{{course.term4st}}</span>
                </td>
                <td>
                  <span v-if="course.term4nd == 0"></span>
                  <span v-else>{{course.term4nd}}</span>
                </td>
                <td>
                  <span v-if="course.term5st == 0"></span>
                  <span v-else>{{course.term5st}}</span>
                </td>
                <td>
                  <span v-if="course.term5nd == 0"></span>
                  <span v-else>{{course.term5nd}}</span>
                </td>
                <td>
                  <span v-if="course.term6st == 0"></span>
                  <span v-else>{{course.term6st}}</span>
                </td>
                <td>
                  <span v-if="course.term6nd == 0"></span>
                  <span v-else>{{course.term6nd}}</span>
                </td>
                <td>
                  <span v-if="course.term7st == 0"></span>
                  <span v-else>{{course.term7st}}</span>
                </td>
                <td>
                  <span v-if="course.term7nd == 0"></span>
                  <span v-else>{{course.term7nd}}</span>
                </td>
                <td>
                  <span v-if="course.term8st == 0"></span>
                  <span v-else>{{course.term8st}}</span>
                </td>
                <td>
                  <span v-if="course.term8nd == 0"></span>
                  <span v-else>{{course.term8nd}}</span>
                </td>
                <td>
                  <span v-if="course.term9st == 0"></span>
                  <span v-else>{{course.term9st}}</span>
                </td>
                <td>
                  <span v-if="course.term9nd == 0"></span>
                  <span v-else>{{course.term9nd}}</span>
                </td>
                <td>
                  <span v-if="course.term10st == 0"></span>
                  <span v-else>{{course.term10st}}</span>
                </td>
                <td>
                  <span v-if="course.term10nd == 0"></span>
                  <span v-else>{{course.term10nd}}</span>
                </td>
                <td v-text="course.checkSemesters"></td>
                <td v-text="course.examSemesters"></td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--课程信息table-->
        </div>
      </div>
    </div>
    <!--3年制培养方案-->
    <div>
      <modal v-model="modalDownloadBool" width="400" id="modalBody">
        <div style="text-align: center;font-size: 1.1rem;">
          <p v-if="downloadMsg == '1'">文件格式不正确，请上传xls或xlsx表格。</p>
          <p v-else-if="downloadMsg == '2'">文件太大，不能超过 2M</p>
          <p v-else-if="downloadMsg == '3'">上传成功!</p>
          <p v-else-if="downloadMsg == '4'">上传失败!</p>
          <p v-else>{{downloadMsg}}</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="checkOk">确定</button>
        </div>
      </modal>
      <Modal
        v-model="modal1"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
        <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
        <div style="font-size: 1.1rem;text-align: center;">
          <p>您确定要删除这门课程吗？</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="deleteOK()">确定</button>
          <button id="modalBtn" @click="modal1 = false">取消</button>
        </div>
      </Modal>
      <Modal
        v-model="modalAdd"
        width="520"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
        <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
        <div>
          <span style="font-size: medium;padding: 0.5rem">课程编号:</span>
          <input placeholder="必填项" style="width: 8rem" v-model="courseDetail.courseId">
          <span style="font-size: medium;padding: 0.5rem">课程类型:</span>
          <select style="width: 8rem" v-model="courseDetail.courseTypeName">
            <option value="公共必修课">公共必修课</option>
            <option value="公共选修课">公共选修课</option>
            <option value="专业必修课">专业必修课</option>
            <option value="专业选修课">专业选修课</option>
          </select>
        </div>
        <div style="margin: 0.2rem 0">
          <span style="font-size: medium;padding: 0.5rem">课程名称:</span>
          <input placeholder="必填项" style="width: 8rem" v-model="courseDetail.courseName">
          <span style="font-size: medium;padding: 0.5rem">总计学时:</span>
          <input type="number" style="width: 8rem" v-model="courseDetail.totalHours">
        </div>
        <div style="margin: 0.2rem 0">
          <span style="font-size: medium;padding: 0.5rem">理论学时:</span>
          <input type="number" style="width: 8rem" v-model="courseDetail.theoryHours">
          <span style="font-size: medium;padding: 0.5rem">实践学时:</span>
          <input type="number" style="width: 8rem" v-model="courseDetail.practice">
        </div>
        <div>
          <table class="normalTable">
            <thead>
            <th width="10%" style="font-size: 0.8rem">周/学期</th>
            <th width="9%">1</th>
            <th width="9%">2</th>
            <th width="9%">3</th>
            <th width="9%">4</th>
            <th width="9%">5</th>
            <th width="9%">6</th>
            <th width="9%">7</th>
            <th width="9%">8</th>
            <th width="9%">9</th>
            <th width="9%">10</th>
            </thead>
            <tbody>
            <tr>
              <td>前9周</td>
              <td><input type="number" class="tableinput" v-model="courseDetail.term1st"></td>
              <td><input type="number" class="tableinput" v-model="courseDetail.term2st"></td>
              <td><input type="number" class="tableinput" v-model="courseDetail.term3st"></td>
              <td><input type="number" class="tableinput" v-model="courseDetail.term4st"></td>
              <td><input type="number" class="tableinput" v-model="courseDetail.term5st"></td>
              <td><input type="number" class="tableinput" v-model="courseDetail.term6st"></td>
              <td><input type="number" class="tableinput" v-model="courseDetail.term7st"></td>
              <td><input type="number" class="tableinput" v-model="courseDetail.term8st"></td>
              <td><input type="number" class="tableinput" v-model="courseDetail.term9st"></td>
              <td><input type="number" class="tableinput" v-model="courseDetail.term10st"></td>
            </tr>
            <tr>
              <td>后9周</td>
              <td><input type="number" class="tableinput" v-model="courseDetail.term1nd"></td>
              <td><input type="number" class="tableinput" v-model="courseDetail.term2nd"></td>
              <td><input type="number" class="tableinput" v-model="courseDetail.term3nd"></td>
              <td><input type="number" class="tableinput" v-model="courseDetail.term4nd"></td>
              <td><input type="number" class="tableinput" v-model="courseDetail.term5nd"></td>
              <td><input type="number" class="tableinput" v-model="courseDetail.term6nd"></td>
              <td><input type="number" class="tableinput" v-model="courseDetail.term7nd"></td>
              <td><input type="number" class="tableinput" v-model="courseDetail.term8nd"></td>
              <td><input type="number" class="tableinput" v-model="courseDetail.term9nd"></td>
              <td><input type="number" class="tableinput" v-model="courseDetail.term10nd"></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div style="margin: 0.2rem 0">
          <span style="font-size: medium;padding: 0.5rem">考查学期:</span>
          <input style="width: 9rem" v-model="courseDetail.checkSemesters">
          <span style="font-size: medium;padding: 0.5rem">考试学期:</span>
          <input style="width: 9rem" v-model="courseDetail.examSemesters">
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="addOK()">新增</button>
          <button id="modalBtn" @click="modalAdd = false">取消</button>
        </div>
        <div>
          <span style="font-size: medium;padding: 0.5rem;color: red">注:考查与考试学期的学期之间请用空格隔开,开始和结尾不要有空格</span>
        </div>
      </Modal>
      <Modal
        v-model="modalEdit"
        width="520"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
        <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
        <div>
          <span style="font-size: medium;padding: 0.5rem">课程编号:</span>
          <input placeholder="必填项" style="width: 8rem" v-model="courseBuffer.courseId">
          <span style="font-size: medium;padding: 0.5rem">课程类型:</span>
          <select style="width: 8rem" v-model="courseBuffer.courseTypeName">
            <option value="公共必修课">公共必修课</option>
            <option value="公共选修课">公共选修课</option>
            <option value="专业必修课">专业必修课</option>
            <option value="专业选修课">专业选修课</option>
          </select>
        </div>
        <div style="margin: 0.2rem 0">
          <span style="font-size: medium;padding: 0.5rem">课程名称:</span>
          <input placeholder="必填项" style="width: 8rem" v-model="courseBuffer.courseName">
          <span style="font-size: medium;padding: 0.5rem">总计学时:</span>
          <input type="number" style="width: 8rem" v-model="courseBuffer.totalHours">
        </div>
        <div >
          <span style="font-size: medium;padding: 0.5rem">理论学时:</span>
          <input type="number" style="width: 8rem" v-model="courseBuffer.theoryHours">
          <span style="font-size: medium;padding: 0.5rem">实践学时:</span>
          <input type="number" style="width: 8rem" v-model="courseBuffer.practice">
        </div>
        <div>
          <table class="normalTable">
            <thead>
            <th width="10%" style="font-size: 0.8rem">周/学期</th>
            <th width="9%">1</th>
            <th width="9%">2</th>
            <th width="9%">3</th>
            <th width="9%">4</th>
            <th width="9%">5</th>
            <th width="9%">6</th>
            <th width="9%">7</th>
            <th width="9%">8</th>
            <th width="9%">9</th>
            <th width="9%">10</th>
            </thead>
            <tbody>
            <tr>
              <td>前9周</td>
              <td><input type="number" class="tableinput" v-model="courseBuffer.term1st"></td>
              <td><input type="number" class="tableinput" v-model="courseBuffer.term2st"></td>
              <td><input type="number" class="tableinput" v-model="courseBuffer.term3st"></td>
              <td><input type="number" class="tableinput" v-model="courseBuffer.term4st"></td>
              <td><input type="number" class="tableinput" v-model="courseBuffer.term5st"></td>
              <td><input type="number" class="tableinput" v-model="courseBuffer.term6st"></td>
              <td><input type="number" class="tableinput" v-model="courseBuffer.term7st"></td>
              <td><input type="number" class="tableinput" v-model="courseBuffer.term8st"></td>
              <td><input type="number" class="tableinput" v-model="courseBuffer.term9st"></td>
              <td><input type="number" class="tableinput" v-model="courseBuffer.term10st"></td>
            </tr>
            <tr>
              <td>后9周</td>
              <td><input type="number" class="tableinput" v-model="courseBuffer.term1nd"></td>
              <td><input type="number" class="tableinput" v-model="courseBuffer.term2nd"></td>
              <td><input type="number" class="tableinput" v-model="courseBuffer.term3nd"></td>
              <td><input type="number" class="tableinput" v-model="courseBuffer.term4nd"></td>
              <td><input type="number" class="tableinput" v-model="courseBuffer.term5nd"></td>
              <td><input type="number" class="tableinput" v-model="courseBuffer.term6nd"></td>
              <td><input type="number" class="tableinput" v-model="courseBuffer.term7nd"></td>
              <td><input type="number" class="tableinput" v-model="courseBuffer.term8nd"></td>
              <td><input type="number" class="tableinput" v-model="courseBuffer.term9nd"></td>
              <td><input type="number" class="tableinput" v-model="courseBuffer.term10nd"></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div style="margin: 0.2rem 0">
          <span style="font-size: medium;padding: 0.5rem">考查学期:</span>
          <input style="width: 9rem" v-model="courseBuffer.checkSemesters">
          <span style="font-size: medium;padding: 0.5rem">考试学期:</span>
          <input style="width: 9rem" v-model="courseBuffer.examSemesters">
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="saveOK()">保存</button>
          <button id="modalBtn" @click="modalEdit = false">取消</button>
        </div>
        <div>
          <span style="font-size: medium;padding: 0.5rem;color: red">注:考查与考试学期的学期之间请用空格隔开,开始和结尾不要有空格</span>
        </div>
      </Modal>
      <Modal
        v-model="modalcV"
        width="400"
        :mask-closable="false"
        id="modalBody"
        :styles="{top:'10rem'}">
        <!--对话框宽400px，显示隐藏绑定属性变量，不允许点击遮罩层关闭对话框，对话框距离页面顶端10rem-->
        <div style="font-size: 1.1rem;text-align: center;">
          <p>{{msgcV}}？</p>
        </div>
        <div slot="footer" style="text-align: center">
          <button id="modalBtn" @click="cVclickOK()">确定</button>
          <button id="modalBtn" @click="modalcV = false">取消</button>
        </div>
      </Modal>
    </div>
    <!--上传文件出错信息提示弹窗-->
  </div>
</template>

<script>
  import arrowright from "./images/arrowright.png"
  import arrowdown from "./images/arrowdown.png"
  export default {
    name: '',
    data () {
      return {
        arrowright:arrowright,
        arrowdown:arrowdown,
        courseIndex:'0',
        dindex:'',
        dIndex:'',
        aindex:'',
        aIndex:'',
        cVindex:'',
        cCindex:'null',
        gradeIdArr:[
          /*{
            gradeName: '2016',
            yearType: '5'
          }, {
            gradeName: '2017',
            yearType: '3'
          }*/
        ],
        courseAllList:[
         /*{
           grade:'2016',
           yearType:'3',
           courseList:[
             {courseId:'55345',courseTypeName:'公共必修课',courseName:'职业生涯规划',totalHours:'36',theoryHours:'32',practice:'4',term1st:'36',term1nd:'36',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',checkSemesters:'1',examSemesters:''},
             {courseId:'55346',courseTypeName:'专业选修课',courseName:'哲学与人生',totalHours:'36',theoryHours:'32',practice:'4',term1st:'36',term1nd:'36',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',checkSemesters:'2',examSemesters:''},
             {courseId:'55347',courseTypeName:'专业选修课',courseName:'经济政治与社会',totalHours:'36',theoryHours:'32',practice:'4',term1st:'36',term1nd:'36',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',checkSemesters:'3',examSemesters:''}
           ]
         },
         {
           grade:'2017',
           yearType:'3',
           courseList:[
             {courseId:'55345',courseTypeName:'公共必修课',courseName:'职业生涯规划',totalHours:'36',theoryHours:'32',practice:'4',term1st:'36',term1nd:'36',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',checkSemesters:'1',examSemesters:''},
             {courseId:'55346',courseTypeName:'专业选修课',courseName:'哲学与人生',totalHours:'36',theoryHours:'32',practice:'4',term1st:'36',term1nd:'36',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',checkSemesters:'2',examSemesters:''},
             {courseId:'55347',courseTypeName:'专业选修课',courseName:'经济政治与社会',totalHours:'36',theoryHours:'32',practice:'4',term1st:'36',term1nd:'36',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',checkSemesters:'3',examSemesters:''}
           ]
         }*/
        ],
        courseDetail:{grade:'',yearType:'',courseId:'',courseTypeName:'专业选修课',courseName:'',totalHours:'',theoryHours:'',practice:'',
          term1st:'',term1nd:'',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',
          term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',checkSemesters:'',examSemesters:''},
        courseBuffer:{grade:'',yearType:'',courseId:'',courseTypeName:'专业选修课',courseName:'',totalHours:'',theoryHours:'',practice:'',
          term1st:'',term1nd:'',term2st:'',term2nd:'',term3st:'',term3nd:'',term4st:'',term4nd:'',term5st:'',term5nd:'',term6st:'',
          term6nd:'',term7st:'',term7nd:'',term8st:'',term8nd:'',term9st:'',term9nd:'',term10st:'',term10nd:'',checkSemesters:'',examSemesters:''},
        modalDownloadBool:false,
        modal1:false,
        modalcV:false,
        modalAdd:false,
        modalEdit:false,
        modalAddType:'',
        checkSemestersStatus:false,
        downloadMsg:'',
        addBuffer:[]
      }
    },
    beforeMount:function() {
      this.$http.post('./schoolCoursePlan/showGrade',{},{
        "Content-Type":"application/json"
      }).then(function (response) {
        var gradeIdList = response.body.gradeIdList;
        for(var i=0;i<gradeIdList.length;i++){
          this.gradeIdArr.push({gradeName:gradeIdList[i].slice(0,4),yearType:gradeIdList[i].slice(4,5)});
          this.courseAllList.push({grade:gradeIdList[i].slice(0,4),yearType:gradeIdList[i].slice(4,5),courseList:[]})
        }
      },function(){
      });
    },
    methods:{
      getPlan:function(index){
        this.$http.post('./schoolCoursePlan/showPlan', {
          "gradeId": this.gradeIdArr[index].gradeName + this.gradeIdArr[index].yearType
        }, {
          "Content-Type": "application/json"
        }).then(function(response) {
            if(response.body.result == 1){
              this.courseAllList[index].courseList = response.body.schoolCoursePlanVoList;
            }
        }, function(error) {});
      },
      delPlan:function (index) {
        var delResult = true;
        const dels = [];
        try{
          for (var i = 0; i < this.courseAllList[index].courseList.length; i++) {
            ((j) => {
              dels.push(new Promise((resolve,reject) => {
                this.$http.post('./schoolCoursePlan/deletePlan', {
                  teachPlanId: this.gradeIdArr[index].gradeName + this.gradeIdArr[index].yearType +
                    this.courseAllList[index].courseList[j].courseId
                }, {
                  "Content-Type": "application/json"
                }).then(function(response) {
                  if (response.body.result != 1) {
                    delResult = false;
                  }
                  resolve();
                }, function(error) {
                  reject();
                });
              }));
            })(i);
          }
        }catch(error){
          console.log(error)
        }

        Promise.all(dels).then(() => {
          if(delResult == false){
            this.$Message.error("部分原信息删除失败！");
          }
        },() => {
          this.$Message.error("网络错误,请稍后重试！");
        });
      },
      tableSlideToggle:function(yearType,gradeIndex,gradeName){
        var table = document.getElementById(yearType + 'Table' + gradeIndex);
        var arrow = document.getElementById(yearType + 'Arrow' + gradeIndex);
        if (arrow.src === this.arrowright){
          this.$Loading.start();
          this.$http.post('./schoolCoursePlan/showPlan',{
            "gradeId":this.gradeIdArr[gradeIndex].gradeName+this.gradeIdArr[gradeIndex].yearType
          },{
            "Content-Type":"application/json"
          }).then(function (response) {
            if(response.body.result == 1){
              this.courseAllList[gradeIndex].courseList = response.body.schoolCoursePlanVoList;
            }
            this.$Loading.finish();
          },function(){
            this.$Loading.error();
            this.$Message.error("网络错误，请稍后重试！");
          });
          table.style.display = "inline";
          arrow.src = this.arrowdown;
        }
        else {
          table.style.display = "none";
          arrow.src = this.arrowright;
        }
      },
      mousemove:function (event) {
        event.target.style.backgroundColor = "#1fa573";
        event.target.style.color = "white";
      },
      mouseout:function (event) {
        event.target.style.backgroundColor = "";
        event.target.style.color = "black";
      },
      deleteCourse:function (index,Index) {
        this.dindex = index;
        this.dIndex = Index;
        this.modal1 = true;
      },
      deleteOK:function () {
        this.$http.post('./schoolCoursePlan/deletePlan',{
          teachPlanId:this.gradeIdArr[this.dindex].gradeName+this.gradeIdArr[this.dindex].yearType+
          this.courseAllList[this.dindex].courseList[this.dIndex].courseId
        },{
          "Content-Type":"application/json"
        }).then(function(response){
          if(response.body.result == 1)
          {
            this.courseAllList[this.dindex].courseList.splice(this.dIndex,1);
            this.modal1 = false;
            this.$Message.success("删除成功！");
          }else
          {
            this.$Message.error("删除失败,请稍后重试！");
          }
        },function(error){
          this.$Message.error("网络错误,请稍后重试！");
        });
      },
      addCourse:function (index) {
        this.courseDetail.grade = this.gradeIdArr[index].gradeName;
        this.courseDetail.yearType = this.gradeIdArr[index].yearType;
        this.aindex = index;
        this.modalAdd = true;
      },
      addOK:function () {
        if(this.courseDetail.courseId == "")
        {
          this.$Message.error("编号不能为空!");
          return;
        }
        if(this.courseDetail.courseName == "")
        {
          this.$Message.error("课程名称不能为空!");
          return;
        }
        this.acheckSemesters();
        if(this.checkSemestersStatus)
        {
            this.$Message.error("考查或考试学期不合法!");
            return;
        }
        this.$Message.loading("正在保存，请勿重复点击保存");
        this.$http.post('./schoolCoursePlan/addPlan',{
          schoolCoursePlanVo:this.courseDetail
        },{
          "Content-Type":"application/json"
        }).then(function(response){
          if(response.body.result == 1)
          {
            this.$Loading.start();
            this.$http.post('./schoolCoursePlan/showPlan',{
              "gradeId":this.gradeIdArr[this.aindex].gradeName+this.gradeIdArr[this.aindex].yearType
            },{
              "Content-Type":"application/json"
            }).then(function (response) {
              this.courseAllList[this.aindex].grade = response.body.grade;
              this.courseAllList[this.aindex].yearType = response.body.yearType;
              this.courseAllList[this.aindex].courseList = response.body.schoolCoursePlanVoList;
              this.modalAdd = false;
              this.$Message.success("新增成功！");
              this.$Loading.finish();
            },function(){
              this.$Loading.error();
              this.$Message.error("网络错误，请稍后重试！");
            });
          }else if(response.body.result == -1||response.body.result == -2)
          {
            this.$Message.error("新增信息有误，请检查后重试！");
          }else
          {
            this.$Message.error("新增失败，请稍后重试！");
          }
        },function(error){
          this.$Message.error("网络错误,请稍后重试！");
        });
      },
      cCclick:function(index){
        if (typeof(this.courseAllList[index].courseList) == "undefined" || this.courseAllList[index].courseList.length == 0) {
          const msgloading = this.$Message.loading("正在复制，请稍等", 0);
          this.$http.post('./schoolCoursePlan/showPlan', {
            "gradeId":this.gradeIdArr[index].gradeName+this.gradeIdArr[index].yearType
          }, {
            "Content-Type": "application/json"
          }).then(function(response) {
            setTimeout(msgloading, 500);
            if (response.body.result == "计划为空" || response.body.result != 1) {
              this.$Message.warning("复制失败，目标培养方案为空！");
              this.cCindex = null;
            } else {
              this.courseAllList[index].courseList = response.body.schoolCoursePlanVoList;
              var msg = this.gradeIdArr[index].gradeName + "级的培养方案已复制！";
              this.$Message.success(msg);
              this.cCindex = index;
            }
          }, function(error) {
            this.$Message.error("复制失败，目标培养方案为空！");
            this.cCindex = null;
          });
        } else {
          var msg = this.gradeIdArr[index].gradeName + "级的培养方案已复制！";
          this.$Message.success(msg);
          this.cCindex = index;
        }
      },
      cVclick: function(index) {
        var cYearType = null;
        var vYearType = null;
        if (this.cCindex == "null") {
          this.$Message.error("没有已复制的培养方案信息，无法粘贴！");
          return;
        } else if (this.cCindex == index) {
          this.$Message.error("同一个年级无需粘贴！");
          return;
        }
        this.cVindex = index;
        cYearType = this.gradeIdArr[this.cCindex].yearType;
        vYearType = this.gradeIdArr[this.cVindex].yearType;
        this.msgcV = "你确定要将*" + cYearType + "年制" + this.gradeIdArr[this.cCindex].gradeName + "级*的培养方案信息粘贴到*" + vYearType + "年制" + this.gradeIdArr[this.cVindex].gradeName + "级*吗？（注意：*" + vYearType + "年制" + this.gradeIdArr[this.cVindex].gradeName + "级*的原培养方案信息会被清空）";
        this.modalcV = true;
        console.log(this.courseAllList);
      },
      cVclickOK: function() {
        var partResult = true;
        const msgloading = this.$Message.loading("正在清空原信息并粘贴新培养方案，请勿重复操作", 0);
        this.modalcV = false;
        console.log("cCindex:" + this.cCindex + "; cVindex:" + this.cVindex);
        //this.delPlan(this.cVindex);
        if(typeof(this.courseAllList[this.cVindex].courseList) == "undefined" || this.courseAllList[this.cVindex].courseList.length == 0){
          this.$http.post('./schoolCoursePlan/showPlan', {
            "gradeId": this.gradeIdArr[this.cVindex].gradeName + this.gradeIdArr[this.cVindex].yearType
          }, {
            "Content-Type": "application/json"
          }).then(function(response) {
              if(response.body.result == 1){
                this.courseAllList[this.cVindex].courseList = response.body.schoolCoursePlanVoList;
                var delResult = true;
                const dels = [];
                try {
                  for (var i = 0; i < this.courseAllList[this.cVindex].courseList.length; i++) {
                    ((j) => {
                      dels.push(new Promise((resolve, reject) => {
                        this.$http.post('./schoolCoursePlan/deletePlan', {
                          teachPlanId: this.gradeIdArr[this.cVindex].gradeName + this.gradeIdArr[this.cVindex].yearType +
                            this.courseAllList[this.cVindex].courseList[j].courseId
                        }, {
                          "Content-Type": "application/json"
                        }).then(function(response) {
                          if (response.body.result != 1) {
                            delResult = false;
                          }
                          resolve();
                        }, function(error) {
                          reject();
                        });
                      }));
                    })(i);
                  }
                } catch (error) {
                  console.log(error)
                }

                Promise.all(dels).then(() => {
                  if (delResult == false) {
                    this.$Message.error("部分原信息删除失败！");
                  }
                  partResult = true;
                  const adds = [];
                  for (var i = 0; i < this.courseAllList[this.cCindex].courseList.length; i++) {
                    ((no) => {
                      adds.push(new Promise((resolve, reject) => {
                        let obj = JSON.parse(JSON.stringify(this.courseAllList[this.cCindex].courseList[no]));
                        obj.grade = this.courseAllList[this.cVindex].grade;
                        obj.yearType = this.courseAllList[this.cVindex].yearType;

                        this.$http.post('./schoolCoursePlan/addPlan', {
                          schoolCoursePlanVo: obj
                        }, {
                          "Content-Type": "application/json"
                        }).then(function(response) {
                          if (response.body.result == 1) {
                            this.courseAllList[this.cVindex].courseList.push(obj);
                          } else {
                            partResult = false;
                          }
                          resolve();
                        }, function(error) {
                          reject();
                        });
                      }));
                    })(i);
                  }

                  Promise.all(adds).then(() => {
                    setTimeout(msgloading, 500);
                    this.getPlan(this.cVindex);
                    if (partResult == true) {
                      this.$Message.success("复制粘贴成功！");
                    } else {
                      this.$Message.error("部分粘贴失败，请刷新确认！");
                    }
                  }, () => {
                    setTimeout(msgloading, 500);
                    this.$Message.error("部分粘贴失败，请刷新确认！");
                    this.getPlan(this.cVindex);
                  });
                }, () => {
                  setTimeout(msgloading, 500);
                  this.$Message.error("网络错误,请稍后重试！");
                });
              }
          }, function(error) {
            setTimeout(msgloading, 500);
            this.$Message.error("网络错误,请稍后重试！");
            return;
          });
        }else{
          var delResult = true;
          const dels = [];
          try {
            for (var i = 0; i < this.courseAllList[this.cVindex].courseList.length; i++) {
              ((j) => {
                dels.push(new Promise((resolve, reject) => {
                  this.$http.post('./schoolCoursePlan/deletePlan', {
                    teachPlanId: this.gradeIdArr[this.cVindex].gradeName + this.gradeIdArr[this.cVindex].yearType +
                      this.courseAllList[this.cVindex].courseList[j].courseId
                  }, {
                    "Content-Type": "application/json"
                  }).then(function(response) {
                    if (response.body.result != 1) {
                      delResult = false;
                    }
                    resolve();
                  }, function(error) {
                    reject();
                  });
                }));
              })(i);
            }
          } catch (error) {
            console.log(error)
          }

          Promise.all(dels).then(() => {
            if (delResult == false) {
              this.$Message.error("部分原信息删除失败！");
            }
            partResult = true;
            const adds = [];
            for (var i = 0; i < this.courseAllList[this.cCindex].courseList.length; i++) {
              ((no) => {
                adds.push(new Promise((resolve, reject) => {
                  let obj = JSON.parse(JSON.stringify(this.courseAllList[this.cCindex].courseList[no]));
                  obj.grade = this.courseAllList[this.cVindex].grade;
                  obj.yearType = this.courseAllList[this.cVindex].yearType;

                  this.$http.post('./schoolCoursePlan/addPlan', {
                    schoolCoursePlanVo: obj
                  }, {
                    "Content-Type": "application/json"
                  }).then(function(response) {
                    if (response.body.result == 1) {
                      this.courseAllList[this.cVindex].courseList.push(obj);
                    } else {
                      partResult = false;
                    }
                    resolve();
                  }, function(error) {
                    reject();
                  });
                }));
              })(i);
            }

            Promise.all(adds).then(() => {
              setTimeout(msgloading, 500);
              this.getPlan(this.cVindex);
              if (partResult == true) {
                this.$Message.success("复制粘贴成功！");
              } else {
                this.$Message.error("部分粘贴失败，请刷新确认！");
              }
            }, () => {
              setTimeout(msgloading, 500);
              this.$Message.error("部分粘贴失败，请刷新确认！");
              this.getPlan(this.cVindex);
            });
          }, () => {
            setTimeout(msgloading, 500);
            this.$Message.error("网络错误,请稍后重试！");
          });
        }
      },
      saveOK:function () {
        if(this.courseBuffer.courseId == "")
        {
          this.$Message.error("编号不能为空!");
          return;
        }
        if(this.courseBuffer.courseName == "")
        {
          this.$Message.error("课程名称不能为空!");
          return;
        }
        this.echeckSemesters();
        if(this.checkSemestersStatus)
        {
          this.$Message.error("考查或考试学期不合法!");
          return;
        }
        var arr = [];
        arr.push(this.courseBuffer);
        this.$http.post('./schoolCoursePlan/savePlan',{
          schoolCoursePlanVoList:arr
        },{
          "Content-Type":"application/json"
        }).then(function(response){
          if(response.body.result == 1)
          {
            this.saveAfter();
            this.modalEdit = false;
            this.$Message.success("修改成功！");
          }else
          {
            this.$Message.error("修改失败,请稍后重试！");
          }
        },function(error){
          this.$Message.error("网络错误,请稍后重试！");
        });
      },
      saveAfter:function () {
        var table = document.getElementById(this.gradeIdArr[this.aindex].yearType+'Tables'+this.aindex);
        //console.log(table[0].rows[3+this.aIndex]);
        table.rows[3+this.aIndex].cells[0].innerText=this.courseBuffer.courseId;
        table.rows[3+this.aIndex].cells[1].innerText=this.courseBuffer.courseTypeName;
        table.rows[3+this.aIndex].cells[2].innerText=this.courseBuffer.courseName;
        table.rows[3+this.aIndex].cells[3].innerText=this.courseBuffer.totalHours;
        table.rows[3+this.aIndex].cells[4].innerText=this.courseBuffer.theoryHours;
        table.rows[3+this.aIndex].cells[5].innerText=this.courseBuffer.practice;
        table.rows[3+this.aIndex].cells[6].innerText=this.courseBuffer.term1st;
        table.rows[3+this.aIndex].cells[7].innerText=this.courseBuffer.term1nd;
        table.rows[3+this.aIndex].cells[8].innerText=this.courseBuffer.term2st;
        table.rows[3+this.aIndex].cells[9].innerText=this.courseBuffer.term2nd;
        table.rows[3+this.aIndex].cells[10].innerText=this.courseBuffer.term3st;
        table.rows[3+this.aIndex].cells[11].innerText=this.courseBuffer.term3nd;
        table.rows[3+this.aIndex].cells[12].innerText=this.courseBuffer.term4st;
        table.rows[3+this.aIndex].cells[13].innerText=this.courseBuffer.term4nd;
        table.rows[3+this.aIndex].cells[14].innerText=this.courseBuffer.term5st;
        table.rows[3+this.aIndex].cells[15].innerText=this.courseBuffer.term5nd;
        table.rows[3+this.aIndex].cells[16].innerText=this.courseBuffer.term6st;
        table.rows[3+this.aIndex].cells[17].innerText=this.courseBuffer.term6nd;
        table.rows[3+this.aIndex].cells[18].innerText=this.courseBuffer.term7st;
        table.rows[3+this.aIndex].cells[19].innerText=this.courseBuffer.term7nd;
        table.rows[3+this.aIndex].cells[20].innerText=this.courseBuffer.term8st;
        table.rows[3+this.aIndex].cells[21].innerText=this.courseBuffer.term8nd;
        table.rows[3+this.aIndex].cells[22].innerText=this.courseBuffer.term9st;
        table.rows[3+this.aIndex].cells[23].innerText=this.courseBuffer.term9nd;
        table.rows[3+this.aIndex].cells[24].innerText=this.courseBuffer.term10st;
        table.rows[3+this.aIndex].cells[25].innerText=this.courseBuffer.term10nd;
        table.rows[3+this.aIndex].cells[26].innerText=this.courseBuffer.checkSemesters;
        table.rows[3+this.aIndex].cells[27].innerText=this.courseBuffer.examSemesters;
      },
      editCourse:function (index,Index) {
        var table = document.getElementById(this.gradeIdArr[index].yearType+'Tables'+index);
        this.courseBuffer.grade = this.gradeIdArr[index].gradeName;
        this.courseBuffer.yearType = this.gradeIdArr[index].yearType;
        this.courseBuffer.courseId=table.rows[3+Index].cells[0].innerText;
        this.courseBuffer.courseTypeName=table.rows[3+Index].cells[1].innerText;
        this.courseBuffer.courseName= table.rows[3+Index].cells[2].innerText;
        this.courseBuffer.totalHours=table.rows[3+Index].cells[3].innerText;
        this.courseBuffer.theoryHours=table.rows[3+Index].cells[4].innerText;
        this.courseBuffer.practice=table.rows[3+Index].cells[5].innerText;
        this.courseBuffer.term1st=table.rows[3+Index].cells[6].innerText;
        this.courseBuffer.term1nd=table.rows[3+Index].cells[7].innerText;
        this.courseBuffer.term2st=table.rows[3+Index].cells[8].innerText;
        this.courseBuffer.term2nd=table.rows[3+Index].cells[9].innerText;
        this.courseBuffer.term3st=table.rows[3+Index].cells[10].innerText;
        this.courseBuffer.term3nd=table.rows[3+Index].cells[11].innerText;
        this.courseBuffer.term4st=table.rows[3+Index].cells[12].innerText;
        this.courseBuffer.term4nd=table.rows[3+Index].cells[13].innerText;
        this.courseBuffer.term5st=table.rows[3+Index].cells[14].innerText;
        this.courseBuffer.term5nd=table.rows[3+Index].cells[15].innerText;
        this.courseBuffer.term6st=table.rows[3+Index].cells[16].innerText;
        this.courseBuffer.term6nd=table.rows[3+Index].cells[17].innerText;
        this.courseBuffer.term7st=table.rows[3+Index].cells[18].innerText;
        this.courseBuffer.term7nd=table.rows[3+Index].cells[19].innerText;
        this.courseBuffer.term8st=table.rows[3+Index].cells[20].innerText;
        this.courseBuffer.term8nd=table.rows[3+Index].cells[21].innerText;
        this.courseBuffer.term9st=table.rows[3+Index].cells[22].innerText;
        this.courseBuffer.term9nd=table.rows[3+Index].cells[23].innerText;
        this.courseBuffer.term10st=table.rows[3+Index].cells[24].innerText;
        this.courseBuffer.term10nd=table.rows[3+Index].cells[25].innerText;
        this.courseBuffer.checkSemesters=table.rows[3+Index].cells[26].innerText;
        this.courseBuffer.examSemesters=table.rows[3+Index].cells[27].innerText;
        this.aindex = index;
        this.aIndex = Index;
        this.modalEdit = true;
      },
      acheckSemesters:function () {
        this.checkSemestersStatus = false;
        var arr1 = this.courseDetail.checkSemesters.split(" ");
        var arr2 = this.courseDetail.examSemesters.split(" ");
        if(this.courseDetail.checkSemesters !="")
        {
          for(var i=0;i < arr1.length;i++)
          {
            if(!/^[0-9]*[1-9][0-9]*$/.test(arr1[i])||arr1[i]>10)
            {
              this.checkSemestersStatus = true;
              //console.log(/^[0-9]*[1-9][0-9]*$/.test(arr1[i]));
              return;
            }
          }
        }
        if(this.courseDetail.examSemesters!="")
        {
          for(var j=0;j < arr2.length;j++)
          {
            if(!/^[0-9]*[1-9][0-9]*$/.test(arr2[j])||arr2[j]>10)
            {
              this.checkSemestersStatus = true;
              return;
            }
          }
        }
      },
      echeckSemesters:function () {
        this.checkSemestersStatus = false;
        var arr1 = this.courseBuffer.checkSemesters.split(" ");
        var arr2 = this.courseBuffer.examSemesters.split(" ");
        if(this.courseBuffer.checkSemesters !="")
        {
          for(var i=0;i < arr1.length;i++)
          {
            if(!/^[0-9]*[1-9][0-9]*$/.test(arr1[i])||arr1[i]>10)
            {
              this.checkSemestersStatus = true;
              //console.log(/^[0-9]*[1-9][0-9]*$/.test(arr1[i]));
              return;
            }
          }
        }
        if(this.courseBuffer.examSemesters!="")
        {
          for(var j=0;j < arr2.length;j++)
          {
            if(!/^[0-9]*[1-9][0-9]*$/.test(arr2[j])||arr2[j]>10)
            {
              this.checkSemestersStatus = true;
              return;
            }
          }
        }
      },
//      点击年级下拉该年级培养方案表格
      handleFormatError:function(file){
        this.downloadMsg = '1';
        this.modalDownloadBool = true;
      },
//      处理上传文件格式错误问题
      handleSizeError:function(file){
        this.downloadMsg = '2';
        this.modalDownloadBool = true;
      },
//      处理上传文件大小过大问题
      handleProgress:function(){
        this.$Message.loading("正在上传中...");
      },
//      message提示用户文件正在上传
      handleSuccess:function(res){
        if(res.result==1){
          this.downloadMsg = '3';
          setTimeout("location.reload(true)", 4000); //4秒后刷新页面
        }else{
          this.downloadMsg = res.result;
        }
        this.modalDownloadBool = true;
      },
//      文件上传成功后，若文件内容没问题，提示上传成功,4s后刷新页面，若文件内容出错，弹窗提示出错信息
      handleError:function(){
        this.downloadMsg = '4';
        this.modalDownloadBool = true;
      },
//      弹窗提示文件上传失败
      checkOk:function(){
        this.modalDownloadBool = false;
      },
//      确认文件上传结果弹窗
      downloadFormClick:function(){
        location.href="./schoolCoursePlan/downloadTemplet";
      },
//      下载培养方案模板
      downloadClick:function(gradeId){
        location.href="./schoolCoursePlan/exportExcel?gradeId="+gradeId;
      }
//      下载某年级的培养方案
    }
  }
</script>

<style scoped>
  html {
    font-size: 100%;
  }
  .yearsTypeDiv{
    position: relative;
    background-color: #158064;
    border-top:3px solid white;
    height: 2.5rem;
    width: 100%;
  }
  .yearsTypeP{
    position: absolute;
    margin-left: 2rem;
    height: 2rem;
    width: 10rem;
    padding-top: 0.5rem;
    text-align: center;
    font-size: 1rem;
    color:#FFF;
    cursor: default;
  }
  .yearButton{
    float: right;
    margin-top: 0.5rem;
    margin-right: 5rem;
    background-color: #158064;
    font-size: 0.8rem;
    color:#FFF;
    text-align: center;
    border-radius: 0.5rem;
    padding-bottom: 0.1rem;
    height: 1.4rem;
    min-width: 5rem;
    border-color: white;
    border-style: solid;
    border-width: 0.1rem;
    /*更改button的边框属性*/
  }
  .yearButton:hover{
    background-color: #00a539;
  }
  .gradeButton:hover{
    background-color: #00a539;
  }
  @media screen and (max-width: 1023px) {
    html {
      font-size: 56%;
    }
  }
</style>
