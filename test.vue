<template>
  <div class="main">
    <div :class="['main-left', { 'w-12': hideRight }]">
      <inbox
        @refreshData="handleRefresh"
        style="height: calc(100vh - 88px)"
        :inboxList="cacheGetThreadHead"
      >
        <template #default="{item}">
          <div
            :class="[
							'inbox-item',
							{
								checkboxList: isCheckboxList(item),
								showContent,
								isSelected:
									item.threadId === $store.state.selectThread.threadId,
								isHover: isHover(item)
							}
						]"
            @click="handleClick($event, item)"
          >
            <div
              class="groupCheckbox"
              style=""
            >
              <zm-checkbox-group
                v-model="checkedList"
                @change="handleCheckedCitiesChange"
                aria-label="City list"
              >
                <zm-checkbox
                  ref="checkbox"
                  :label="item.threadId"
                  :id="item.threadId"
                >
                  &nbsp;
                </zm-checkbox>
              </zm-checkbox-group>
            </div>
            <div class="inbox-item_left">
              <div style="margin: 0 17px 0 8px;">
                <div :class="[
										{ isSelected: isSelected(item.name) },
										'left_content'
									]">
                  <div class="df">
                    <!-- <zm-checkbox></zm-checkbox> -->
                    <div :class="[
												'inbox-item_left_name',
												'much-hidden',
												{
													unRead: item.threadHead.isUnread
												}
											]">
                      {{
												item.threadHead.userEmailStatusList
													? item.threadHead.userEmailStatusList
															.map((item) => {
																if (item.userEmail.displayName !== "[Draft]") {
																	return item.userEmail.displayName;
																}
															})
															.filter((item) => item)
															.join(", ")
													: "undefined"
											}}
                      &nbsp;&nbsp;{{
												(item.msgIds && item.msgIds.length) || ""
											}}
                    </div>
                    <span
                      v-if="showDraft(item)"
                      class="draft"
                    >[Draft]</span>
                  </div>
                  <span
                    v-if="item.threadHead.isUnread"
                    class="inbox-item_left_dot"
                  ></span>
                  <span
                    v-if="item.threadHead.isStarred"
                    class="inbox-item_left_star"
                  ></span>
                </div>
              </div>
            </div>
            <div
              v-if="!hideRight"
              class="transtion inbox-item_right item-content"
              @contextmenu.prevent.stop="handleShowAction($event, item)"
            >
              <div class="much-hidden">
                <span :class="{
										unRead: item.threadHead.isUnread
									}">
                  {{
										item.threadHead.subject
											? item.threadHead.subject
											: "(No Subject)"
									}}
                </span>
                <span
                  style=""
                  class="snipped"
                >{{
									item.threadHead.snippet
								}}</span>
              </div>
              <div class="time">
                <div class="control">
                  <zm-tooltip
                    content="Move to Inbox"
                    placement="bottom"
                    v-if="$store.state.selectMailLabel.id === 'TRASH'"
                  >
                    <i
                      class="zm-icon-download-alt-thin icon"
                      @click.stop.prevent="handleMove(item)"
                    ></i>
                  </zm-tooltip>
                  <zm-tooltip
                    content="Trash"
                    placement="bottom"
                  >
                    <i
                      class="zm-icon-delete icon"
                      @click.stop.prevent="handleTrash(item)"
                    ></i>
                  </zm-tooltip>
                  <zm-tooltip
                    content="Archive"
                    placement="bottom"
                    v-if="$store.state.selectMailLabel.id === 'INBOX'"
                  >
                    <i
                      class="zm-icon-ok icon"
                      @click.stop.prevent="handleArchive(item)"
                    ></i>
                  </zm-tooltip>
                  <zm-tooltip
                    :content="
											`Mark as ${
												item.threadHead.isUnread ||
												(checkedList.includes(item.threadId) && markRead)
													? 'Read'
													: 'Unread'
											}`
										"
                    placement="bottom"
                  >
                    <i
                      class="zm-icon-email1 icon"
                      @click.stop.prevent="
												handleMark(
													item,
													item.threadHead.isUnread ? 'Read' : 'unRread'
												)
											"
                    ></i>
                  </zm-tooltip>
                  <zm-tooltip
                    content="Autotrash"
                    placement="bottom"
                  >
                    <i class="zm-icon-refresh icon"></i>
                  </zm-tooltip>
                </div>
                <div :class="[
										'time-control',
										{
											unRead: item.threadHead.isUnread
										}
									]">
                  <i
                    v-if="$store.state.selectMailLabel.id === 'TRASH'"
                    class="zm-icon-delete icon icon-delete"
                  ></i>
                  {{ formatTime(item.threadHead.date) }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </inbox>
      <div
        class="inbox-header"
        v-if="checkedList.length !== 0"
      >
        <zm-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          :controls="Object.keys(GetThreadHead).join(' ')"
        ></zm-checkbox>
        <zm-tooltip
          v-if="$store.state.selectMailLabel.id === 'INBOX'"
          class="item"
          content="Archive"
          placement="bottom"
        >
          <div
            class="edit"
            @click.stop.prevent="handleArchive('all')"
          >
            Archive
          </div>
        </zm-tooltip>
        <zm-tooltip
          v-if="$store.state.selectMailLabel.id === 'TRASH'"
          class="item"
          content="Delete Forever"
          placement="bottom"
        >
          <div
            class="edit"
            @click.stop.prevent="handleDeleteForever('all')"
          >
            Delete Forever
          </div>
        </zm-tooltip>
        <zm-tooltip
          v-if="$store.state.selectMailLabel.id === 'TRASH'"
          class="item"
          content="Move to Inbox"
          placement="bottom"
        >
          <div
            class="edit"
            @click.stop.prevent="handleMove('all')"
          >
            Move to Inbox
          </div>
        </zm-tooltip>
        <zm-tooltip
          class="item"
          :content="`Mark as ${markRead ? 'Read' : 'UnRead'}`"
          placement="bottom"
        >
          <div
            class="edit"
            @click="handleMark('all', markRead ? 'Read' : 'UnRead')"
          >
            Mark as {{ markRead ? "read" : "unread" }}
          </div>
        </zm-tooltip>
        <zm-tooltip
          class="item"
          content="Autotrash"
          placement="bottom"
        >
          <div class="edit">Autotrash</div>
        </zm-tooltip>
        <div class="edit">
          <zm-dropdown trigger="click">
            <span class="zm-dropdown-link">
              <i
                style="outline: none"
                class="zm-icon-more"
              ></i>
            </span>
            <zm-dropdown-menu slot="dropdown">
              <zm-dropdown-item class="clearfix">
                <span @click="handleTrash('all')">
                  Trash
                </span>
              </zm-dropdown-item>
              <zm-dropdown-item class="clearfix">
                <span @click="
										handleMark('all', markStarred ? 'Starred' : 'UnStarred')
									">
                  {{ markStarred ? "Starred" : "UnStarred" }}
                </span>
              </zm-dropdown-item>
            </zm-dropdown-menu>
          </zm-dropdown>
        </div>
      </div>
      <div
        class="actions"
        :style="actionPosition"
        v-if="showActions"
      >
        <!-- aaaaaa -->
        <div class="actions-control">
          <!-- <zm-tooltip content="Trash" placement="bottom">
						<i
							class="zm-icon-delete icon"
							@click.stop.prevent="handleTrash(selectItem)"
						></i>
					</zm-tooltip> -->
          <div
            class="actions-item"
            @click.stop.prevent="handleArchive(selectItem)"
          >
            Archive
          </div>
          <!-- <zm-tooltip content="Archive" placement="bottom">
						<i
							class="zm-icon-ok icon"
							@click.stop.prevent="handleArchive(selectItem)"
						></i>
					</zm-tooltip> -->
          <div
            class="actions-item"
            @click.stop.prevent="
							handleMark(
								selectItem,
								(selectItem.threadHead && selectItem.threadHead.isUnread) ||
									(checkedList.includes(selectItem.item.threadId) && markRead)
									? 'Read'
									: 'unRread'
							)
						"
          >
            {{
							`Mark as ${
								(selectItem.threadHead && selectItem.threadHead.isUnread) ||
								(checkedList.includes(selectItem.threadId) && markRead)
									? "Read"
									: "Unread"
							}`
						}}
          </div>
          <!-- <zm-tooltip content="Autotrash" placement="bottom">
						<i class="zm-icon-refresh icon"></i>
					</zm-tooltip> -->
          <div
            class="actions-item"
            @click.stop.prevent="handleTrash(selectItem)"
          >
            Autotrash
          </div>
          <div
            class="actions-item"
            @click="handleMark('all', markStarred ? 'Starred' : 'UnStarred')"
          >
            {{ markStarred ? "Starred" : "UnStarred" }}
          </div>
          <!-- <zm-tooltip
						:content="
							`Mark as ${
								(selectItem.threadHead && selectItem.threadHead.isUnread) ||
								(checkedList.includes(selectItem.threadId) && markRead)
									? 'Read'
									: 'Unread'
							}`
						"
						placement="bottom"
					>
						<i
							class="zm-icon-email1 icon"
							@click.stop.prevent="
								handleMark(
									selectItem,
									selectItem.threadHead && selectItem.threadHead.isUnread
										? 'Read'
										: 'unRread'
								)
							"
						></i>
					</zm-tooltip> -->
          <!-- <zm-tooltip content="Autotrash" placement="bottom">
						<i class="zm-icon-refresh icon"></i>
					</zm-tooltip> -->
        </div>
      </div>
    </div>
    <div :class="['transtion', { 'main-right': hideRight }]">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import momentTimezone from 'moment-timezone'
import MainHeader from '@/components/Main/MainHeader.vue'
import inbox from '../components/Main/Inbox.vue'
import { obj2Arr } from '../assets/js/util'
// import listLabels from "../assets/js/listLabels.js";
export default {
  name: 'Main',
  // mixin: [listLabels],
  components: {
    inbox,
    MainHeader
  },
  data() {
    return {
      checkAll: false,
      checkedList: [],
      isIndeterminate: true,
      size: 30,
      keeps: 4,
      showActions: false,
      selectItem: {},
      actionX: 0,
      actionY: 0
    }
  },
  methods: {
    handleRefreshData() {},
    showDraft(item) {
      return (
        item.threadHead.userEmailStatusList.length > 0 &&
        item.threadHead.userEmailStatusList.some((item) => item.isDraft)
      )
    },
    isHover(item) {
      // console.log(
      // 	"item.threadId === this.selectItem.threadId",
      // 	item.threadId === this.selectItem.threadId
      // );
      return item.threadId === this.selectItem.threadId
    },
    async handleMove(item) {
      if (this.checkedList.length > 0) {
        item = 'all'
      }
      if (item === 'all') {
        const groupMsgsIds = []
        for (let i = 0; i < this.checkedList.length; i++) {
          const threadId = this.checkedList[i]
          const item = this.GetThreadHead[threadId]
          groupMsgsIds.push({
            groupId: item.groupId,
            msgIds: item.msgIds
          })
        }
        const result = await window.zoomSdk.postJsMessage({
          functionName: 'mailui_movemessages',
          params: {
            fromLabelId: this.$store.state.selectMailLabel.id,
            toLabelId: 'INBOX',
            groupMsgsIds
          }
        })
        if (result.returnCode === 0) {
          this.checkedList.forEach((ite) => {
            this.$store.commit('changeGetThreadHeadLabel', {
              threadId: ite,
              oldLabelId: this.$store.state.selectMailLabel.id,
              newLabelId: 'INBOX'
            })
          })
          this.checkedList.forEach((ite) => {
            // this.$store.commit("deleteGetThreadHead", ite);
            this.$store.dispatch('deleteGetThreadHead', {
              threadId: ite,
              id: this.$store.state.selectMailLabel.id
            })
          })
          this.checkedList = []
        } else {
          this.$message.error('trash failed!')
        }
      } else {
        const result = await window.zoomSdk.postJsMessage({
          functionName: 'mailui_movemessages',
          params: {
            fromLabelId: this.$store.state.selectMailLabel.id,
            toLabelId: 'INBOX',
            groupMsgsIds: [
              {
                groupId: item.groupId,
                msgIds: item.msgIds
              }
            ]
          }
        })
        if (result.returnCode === 0) {
          this.$store.commit('changeGetThreadHeadLabel', {
            threadId: item.threadId,
            oldLabelId: this.$store.state.selectMailLabel.id,
            newLabelId: 'INBOX'
          })
          this.$store.dispatch('deleteGetThreadHead', {
            threadId: item.threadId,
            id: this.$store.state.selectMailLabel.id
          })
        }
      }
    },
    handleDeleteForever() {},
    handleShowAction(e, item) {
      console.log('this is a right mousedown action!')
      // return;
      this.selectItem = item
      console.log(e)
      this.actionX = e.clientX
      this.actionY = e.clientY
      this.showActions = true
    },
    handleRefresh() {
      console.log('handleRefreshData')
      if (this.$store.state.isLastPage.get('this.$store.state.selectMailLabel.id')) {
        this.$message.error('no new data!')
        return
      }
      window.zoomSdk
        .postJsMessage({
          functionName: 'mailui_listthreads',
          params: {
            label: this.$store.state.selectMailLabel.id,
            count: 20
          }
        })
        .then((result) => {
          console.log('mailui_listthreads result', result)
          this.$store.commit('changeIsLastPage', {
            type: result.result.ListThreads.queryLabel,
            result: result.result.ListThreads.isLastPage
          })
          this.$store.dispatch('addListThreads', result.result)
          const GroupMsgIds = result.result.ListThreads.GroupMsgIds
          for (let i = 0; i < GroupMsgIds.length; i++) {
            const item = GroupMsgIds[i]
            window.zoomSdk
              .postJsMessage({
                functionName: 'mailui_getthreadhead',
                params: {
                  labelId: result.result.ListThreads.queryLabel,
                  threadId: item.groupId
                }
              })
              .then((res) => {
                res.result.GetThreadHead.groupId = item.groupId
                res.result.GetThreadHead.msgIds = item.msgIds
                this.$store.commit('addGetThreadHead', res.result)
              })
          }
        })
      // for (let i = 50; i < 100; i++) {
      // 	this.$store.commit("addGetThreadHead", {
      // 		GetThreadHead: {
      // 			groupId: "zid_88987d7100000000_e9540568f769d24f_00" + i,
      // 			msgIds: ["zid_88987d7100000000_e9540568f769d24f_004"],
      // 			labelId: "INBOX",
      // 			threadHead: {
      // 				calId: "",
      // 				calendarType: "NONE",
      // 				date: 1632644973,
      // 				decryptionStatus: "Decrypting",
      // 				hasAttachment: false,
      // 				hasUnreadInCurLabel: true,
      // 				isStarred: false,
      // 				isUnread: true,
      // 				snippet: "",
      // 				subject: `Zoom Encrypted Email ${i}`,
      // 				userEmailStatusList: [
      // 					{
      // 						isAtAll: false,
      // 						isAtMe: false,
      // 						isDraft: false,
      // 						isUnread: true,
      // 						userEmail: {
      // 							displayName: "eddy.qian",
      // 							emailAddr: "eddy.qian@zoomdev.us"
      // 						}
      // 					}
      // 				]
      // 			},
      // 			threadId: "zid_557a7d7100000000_e957ae0c001784a8_0" + i
      // 		}
      // 	});
      // }
    },
    isCheckboxList(item) {
      return this.checkedList.includes(item.threadId)
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === Object.keys(this.GetThreadHead).length
      this.isIndeterminate = checkedCount > 0 && checkedCount < Object.keys(this.GetThreadHead).length
    },
    handleCheckAllChange(val) {
      this.checkedList = val ? Object.keys(this.GetThreadHead) : []
      // console.log(this.checkedList);
      this.isIndeterminate = false
    },
    formatTime(time) {
      if (typeof time !== 'undefined') {
        // return momentTimezone(new Date(time))
        // 	.tz("Asia/ShangHai")
        // 	.format();
        // return momentTimezone(time * 1000).fromNow();
        const now_date = new Date()
        now_date.setHours(0)
        now_date.setMinutes(0)
        now_date.setSeconds(0)
        now_date.setMilliseconds(0)
        const timestamp = now_date.getTime()
        if (timestamp < time * 1000) {
          return momentTimezone(time * 1000).format('h:mm a')
        } else {
          return momentTimezone(time * 1000).format('h:mm a MMM Do')
        }
      } else {
        return 'not valid time'
      }
    },
    async handleTrash(item) {
      if (this.checkedList.length > 0) {
        item = 'all'
      }
      if (item === 'all') {
        console.log('handleTrash')
        const groupMsgsIds = []
        for (let i = 0; i < this.checkedList.length; i++) {
          const threadId = this.checkedList[i]
          const item = this.GetThreadHead[threadId]
          groupMsgsIds.push({
            groupId: item.groupId,
            msgIds: item.msgIds
          })
        }
        const result = await window.zoomSdk.postJsMessage({
          functionName: 'mailui_trashmessages',
          params: {
            fromLabelId: this.$store.state.selectMailLabel.id,
            groupMsgsIds
          }
        })
        if (result.returnCode === 0) {
          this.checkedList.forEach((ite) => {
            this.$store.commit('changeGetThreadHeadLabel', {
              threadId: ite,
              oldLabelId: this.$store.state.selectMailLabel.id,
              newLabelId: 'TRASH'
            })
          })
          this.checkedList.forEach((ite) => {
            // this.$store.commit("deleteGetThreadHead", ite);
            this.$store.dispatch('deleteGetThreadHead', {
              threadId: ite,
              id: this.$store.state.selectMailLabel.id
            })
          })
          this.checkedList = []
        } else {
          this.$message.error('trash failed!')
        }
      } else {
        const result = await window.zoomSdk.postJsMessage({
          functionName: 'mailui_trashmessages',
          params: {
            fromLabelId: item.labelId,
            groupMsgsIds: [
              {
                groupId: item.groupId,
                msgIds: item.msgIds
              }
            ]
          }
        })
        if (result.returnCode === 0) {
          this.$store.commit('changeGetThreadHeadLabel', {
            threadId: item.threadId,
            oldLabelId: this.$store.state.selectMailLabel.id,
            newLabelId: 'TRASH'
          })
          // this.$store.commit("deleteGetThreadHead", item.threadId);
          this.$store.dispatch('deleteGetThreadHead', {
            threadId: item.threadId,
            id: this.$store.state.selectMailLabel.id
          })
        }
      }
    },
    async handleArchive(item) {
      console.log('item', item)
      if (this.checkedList.length > 0) {
        item = 'all'
      }
      if (item === 'all') {
        const groupMsgsIds = []
        for (let i = 0; i < this.checkedList.length; i++) {
          const threadId = this.checkedList[i]
          const item = this.GetThreadHead[threadId]
          groupMsgsIds.push({
            groupId: item.groupId,
            msgIds: item.msgIds
          })
        }
        const result = await window.zoomSdk.postJsMessage({
          functionName: 'mailui_archivemessages',
          params: {
            fromLabelId: this.$store.state.selectMailLabel.id,
            groupMsgsIds
          }
        })
        console.log('result.returnCode => ', result.returnCode)
      } else {
        console.log('handleArchive', item)
        const result = await window.zoomSdk.postJsMessage({
          functionName: 'mailui_archivemessages',
          params: {
            fromLabelId: item.label,
            groupMsgsIds: [
              {
                groupId: item.threadHead.groupId,
                msgIds: item.threadHead.msgIds
              }
            ]
          }
        })
        console.log('result.returnCode => ', result.returnCode)
      }
      this.checkedList = []
    },
    // async handleMark(item, unRead) {
    async handleMark(item, type) {
      // const type = unRead === "Read" ? "Read" : "unRead";
      if (this.checkedList.length > 0) {
        item = 'all'
      }
      if (item === 'all') {
        const groupMsgsIds = []
        for (let i = 0; i < this.checkedList.length; i++) {
          const threadId = this.checkedList[i]
          const item = this.GetThreadHead[threadId]
          groupMsgsIds.push({
            groupId: item.groupId,
            msgIds: item.msgIds
          })
        }
        const result = await window.zoomSdk.postJsMessage({
          functionName: 'mailui_markmessages',
          params: {
            mailMarkType: type,
            fromLabelId: this.$store.state.selectMailLabel.id,
            groupMsgsIds
          }
        })
        if (result.returnCode === 0) {
          this.checkedList.forEach((item) => {
            if (type === 'Read' || type === 'UnRead') {
              this.$store.commit('changeGetThreadHead', {
                threadId: item,
                type: 'isUnread',
                status: type === 'UnRead' ? true : false
              })
            } else if (type === 'Starred' || type === 'UnStarred') {
              this.$store.commit('changeGetThreadHead', {
                threadId: item,
                type: 'isStarred',
                status: type === 'Starred' ? true : false
              })
              console.log('this.$store.state.selectMailLabel.id', this.$store.state.selectMailLabel.id)
              console.log('this.$store.state.GetMailDetails', this.$store.state.GetMailDetails)
              console.log('type ====>< ', type)
              if (type === 'Starred') {
                this.$store.commit('addTypeGetThreadHead', {
                  id: 'STARRED',
                  GetThreadHead: this.$store.state.GetThreadHead[this.$store.state.selectMailLabel.id][item]
                })
              } else {
                this.$store.commit('deleteGetThreadHead', {
                  id: 'STARRED',
                  threadId: item
                })
              }
            }
          })
          this.checkedList = []
        } else {
          this.$message.error('mark failed!')
        }
      } else {
        const result = await window.zoomSdk.postJsMessage({
          functionName: 'mailui_markmessages',
          params: {
            mailMarkType: type,
            fromLabelId: item.labelId,
            groupMsgsIds: [
              {
                // groupId: item.threadHead.groupId,
                // msgIds: item.threadHead.msgIds
                groupId: item.groupId,
                msgIds: item.msgIds
              }
            ]
          }
        })
        if (result.returnCode === 0) {
          if (type === 'Read' || type === 'UnRead') {
            this.$store.commit('changeGetThreadHead', {
              threadId: item.threadId,
              type: 'isUnread',
              status: type === 'UnRead' ? true : false
            })
          } else if (type === 'Starred' || type === 'UnStarred') {
            this.$store.commit('changeGetThreadHead', {
              threadId: item.threadId,
              type: 'isStarred',
              status: type === 'UnStarred' ? true : false
            })
            if (type === 'STARRED') {
              this.$store.commit('addTypeGetThreadHead', {
                id: 'STARRED',
                GetThreadHead: item
              })
            } else {
              this.$store.commit('deleteGetThreadHead', {
                id: 'STARRED',
                threadId: item.threadId
              })
            }
          }
        } else {
          this.$message.error('mark failde!')
        }
      }
    },
    async handleClick(e, item) {
      console.log('inbox handleClick', item)
      // return;
      if (
        e.target.type === 'checkbox' ||
        e.target.className === 'zm-checkbox' ||
        e.target.className === 'zm-checkbox__inner'
      )
        return
      if (window.zoomSdk) {
        console.log('this.$store.state.cacheDetail', this.$store.state.cacheDetail)
        console.log(
          'this.$store.state.cacheDetail[item.threadId]',
          this.$store.state.cacheDetail[item.threadId] && this.$store.state.cacheDetail[item.threadId].length
        )

        if (this.$store.state.cacheDetail[item.threadId] && this.$store.state.cacheDetail[item.threadId].length > 0) {
          this.$store.commit('changeSelectThread', item)
          this.$store.commit('setSelectCacheDetail', this.$store.state.cacheDetail[item.threadId])
          this.$store.commit('changeShowContent', true)
          if (item.threadHead.isUnread) {
            this.handleMark(item, 'Read')
          }
        } else {
          window.zoomSdk
            .postJsMessage({
              functionName: 'mailui_getmaildetails',
              params: {
                msgIds: item.msgIds
              }
            })
            .then((res) => {
              console.log('mailui_getmaildetails', res)
              this.$store.commit(
                'setCacheDetail',
                res.result.GetMailDetails.mailDetails.sort((a, b) => b.mailHead.date - a.mailHead.date)
              )
              console.log('this.$store.state.cacheDetail ===> ', this.$store.state.cacheDetail[item.threadId].length)
              this.$store.commit('setSelectCacheDetail', this.$store.state.cacheDetail[item.threadId])
              this.$store.commit('changeShowContent', true)
              this.$store.commit('changeSelectThread', item)
              if (item.threadHead.isUnread) {
                this.handleMark(item, 'Read')
              }
            })
        }

        // window.zoomSdk
        // 	.postJsMessage({
        // 		functionName: "mailui_getmessageshead",
        // 		params: {
        // 			labelId: this.$store.state.selectMailLabel.id,
        // 			isgIds: item.msgIds
        // 			// threadId: "zid_557a7d7100000000_e957ae0c001784a8_074"
        // 		}
        // 	})
        // 	.then((res) => {
        // 		console.log("mailui_getmessageshead", res);
        // 	});

        // return;
        // const result = await window.zoomSdk.postJsMessage({
        // 	functionName: "mailui_getthreadhead",
        // 	params: {
        // 		labelId: this.$store.state.selectMailLabel.id,
        // 		threadId: item.threadId
        // 		// threadId: "zid_557a7d7100000000_e957ae0c001784a8_074"
        // 	}
        // });
        // console.log("mailui_getthreadhead", result);
        // this.selectedItem = item;
      } else {
        // this.selectedItem = item;
        this.$store.commit('changeShowContent', true)
        this.$store.commit('changeSelectThread', item)
      }
      // this.$router.push({
      // 	name: "inboxContent",
      // 	params: {
      // 		id: item.name
      // 	}
      // });
    },
    isSelected(name) {
      return this.$route.name === 'inboxContent' && this.$route.params.id === name
    }
    // async handleSelectLabel(labelId) {
    // 	console.log(`/main/inbox/${labelId.toLowerCase()}`);
    // 	// this.$router.push(`/main/inbox/${labelId.toLowerCase()}`);
    // 	this.$router.push({
    // 		name: "inbox",
    // 		params: {
    // 			id: labelId.toLowerCase()
    // 		}
    // 	});
    // const result = await window.zoomSdk.postJsMessage({
    // 	functionName: "mailui_listthreads",
    // 	params: {
    // 		label,
    // 		count: 20
    // 	}
    // });
    // if (result.result.returnCode === 0) {
    // 	this.$router.push({
    // 		name: "inbox",
    // 		params: {
    // 			id: labelId
    // 		}
    // 	});
    // } else {
    // }
    // }
  },
  computed: {
    actionPosition() {
      return {
        left: this.actionX + 'px',
        top: this.actionY + 'px'
      }
    },
    hideRight() {
      return this.$route.name === 'inboxContent' && typeof this.$route.params.id !== 'undefined'
    },
    // read is first
    markRead() {
      return (
        this.checkedList.filter((item) => {
          return this.GetThreadHead && this.GetThreadHead[item] && this.GetThreadHead[item].threadHead.isUnread
        }).length > 0
      )
    },
    markStarred() {
      return (
        this.checkedList.filter((item) => {
          return this.GetThreadHead && this.GetThreadHead[item] && !this.GetThreadHead[item].threadHead.isStarred
        }).length > 0
      )
    },
    cacheGetThreadHead() {
      return obj2Arr(this.GetThreadHead).sort((a, b) => b.threadHead.date - a.threadHead.date)
    },
    GetThreadHead() {
      return this.$store.state.GetThreadHead[this.$store.state.selectMailLabel.id] || {}
    },
    showContent() {
      return this.$store.state.showContent
    }
  },
  async mounted() {
    window.addEventListener('click', (e) => {
      console.log('aaaaaaaaaaaaaaaa', e)
      this.showActions = false
      this.selectItem = {}
    })
    // window.zoomSdk
    // 	.postJsMessage({
    // 		functionName: "mailui_listlabels",
    // 		params: {}
    // 	})
    // 	.then((res) => {
    // 		console.log("resaaaaaaaaaaa", res);
    // 	})
    // 	.catch((err) => {
    // 		console.log("err =---------->", err);
    // 	});
  }
}
</script>

<style lang="scss" scoped>
.main {
  .snippet {
    color: rgb(114, 114, 123);
    font-size: 14px;
  }
  font-family: system-ui !important;
  .unRead {
    font-weight: 700;
  }
  .groupCheckbox {
    display: none;
    // display: inline-block;
    position: absolute;
    left: 10px;
    z-index: 3000;
    top: 17px;
  }
  .control {
    display: none;
    .icon {
      outline: none;
      font-size: 16px;
      margin: 0 10px;
      user-select: none;
      cursor: pointer;
      // &:focus {
      // 	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      // }
    }
    .icon:nth-last-child(1) {
      margin-right: 20px;
    }
  }
  display: flex;
  &-left {
    flex: 1;
    transition: all 0.3s;
    cursor: pointer;
    user-select: none;
  }
  .w-12 {
    // width: 288px !important;
    width: 28px !important;
    flex: none;
  }
  &-right {
    border-left: 1px solid #ededf4;
    flex: 1;
  }
  .transtion {
    transition: all 0.3s;
  }
  .transtion {
    transition: all 0.3s;
  }
  .draft {
    font-size: 10px;
    color: red;
  }
  .isSelected {
    background-color: #0e71eb;
  }
  .w100 {
    width: 100%;
  }
  .df {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .draft {
    font-size: 13px;
    margin-right: 10px;
    color: red;
  }
  .isSelected {
    color: white;
    // background-color: #0e71eb;
    // animation: mymove 0.3s;
  }
  @keyframes mymove {
    0% {
      background-color: red;
    }
    50% {
      background-color: blue;
      transform: scale(1.5);
    }
    100% {
      background-color: green;
    }
  }
  .left_content {
    border-radius: 10px;
    position: relative;
    transition: all 0.3s;
  }
  .zm-checkbox__label {
    display: none !important;
  }
  .zm-checkbox {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0;
    margin-right: 0;
    // .zm-checkbox__original:checked + .zm-checkbox__inner::before {
    // 	border-color: red !important;
    // }
  }
}

.time-control {
  margin-right: 20px;
  display: flex;
  align-items: center;
}
.checkboxList {
  // background: pink;
  // transition: background 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
  // 	background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
  background: #0e71eb;
  color: white;
  border-radius: 10px;
  // .control {
  // 	display: block;
  // }
  .inbox-item_left_name {
    color: white;
  }
  .snippet {
    color: white;
  }
  .groupCheckbox {
    display: block;
  }
  .inbox-item_left_dot {
    background-color: white !important;
  }
}
.inbox-item {
  margin: 5px;
  margin-left: 5px;
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 10px;
  &.isSelected {
    background: #0e71eb;
  }
  &:not(.checkboxList):hover {
    background: rgb(238, 237, 241);
    .control {
      display: block;
    }
    .time-control {
      display: none;
    }
    .groupCheckbox {
      display: block;
    }
    &.showContent:hover {
      .groupCheckbox {
        display: none;
      }
    }
    &.isSelected:hover {
      background: #0e71eb;
      .groupCheckbox {
        display: node;
      }
    }
  }
  &_left {
    width: 280px;
    // display: flex;
    // align-items: center;
    // margin: 5px 8px;
    font-family: SF Pro Text;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 16px;
    color: #232333;
    // padding: 9px 0 7px 0;
    padding: 9px 0 9px 0;
    // background: #0e71eb;
    // background-color: pink;
    position: relative;
    &_name {
      // padding: 0 0 0 44px;
      padding: 9px 0 7px 0;
      margin: 0 20px 0 44px;
      // overflow: hidden;
      border-radius: 15px;
      overflow: hidden;
    }
    &_dot {
      position: absolute;
      top: 50%;
      left: 22px;
      transform: translateY(-3px);
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #0e71eb;
    }
    &_star {
      position: absolute;
      top: 60%;
      left: 22px;
      transform: translateY(-3px);
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: orange;
    }
  }
  &_right {
    overflow: hidden;
    // margin-left: 20px;
    flex: 1;
    // width: calc(100% - 280px);
    position: relative;
  }
  .item-content {
    padding: 5px;
    line-height: 30px;
    // background-color: red;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .time {
    // background-color: green;
    margin-left: 20px;
    flex-shrink: 0;
    // width: 100px;
  }
  .much-hidden {
    font-family: system-ui !important;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}

.inbox-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 73px;
  padding: 10px;
  box-sizing: border-box;
  background: white;
  display: flex;
  align-items: center;
  .edit {
    position: relative;
    margin: 5px;
    padding: 5px;
    font-size: 12px;
    font-family: system-ui;
    outline: none;
    color: rgb(114, 114, 123);
    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      border-radius: 10px;
      bottom: 0;
      opacity: 0;
      background: rgb(239, 239, 244);
    }
    &:hover::before {
      opacity: 0.5;
      color: black;
    }
  }
}
.actions {
  position: fixed;
  background: white;
  border-radius: 10px;
  width: 14444;
  overflow: hidden;
  box-shadow: 0px 0px 29px 1px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 29px 1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 29px 1px rgba(0, 0, 0, 0.75);
  &-control {
    display: flex;
    flex-direction: column;
  }
  &-item {
    padding: 15px 20px;
    font-family: system-ui;
    &:hover {
      background-color: #0e71eb;
    }
  }
}
.icon-delete {
  margin-right: 10px;
}
.isHover {
  &:not(.checkboxList) {
    background: rgb(238, 237, 241);
    .control {
      display: block;
    }
    .time-control {
      display: none;
    }
    .groupCheckbox {
      display: block;
    }
    &.showContent:hover {
      .groupCheckbox {
        display: none;
      }
    }
    &.isSelected:hover {
      background: #0e71eb;
      .groupCheckbox {
        display: node;
      }
    }
  }
}
</style>
