"use strict";(self.webpackChunksamurai_way=self.webpackChunksamurai_way||[]).push([[528],{6461:function(t,s,e){e.r(s),e.d(s,{default:function(){return B}});var n=e(8683),i=e(5671),r=e(3144),o=e(136),u=e(5716),a=e(2791),c="ProfileInfo_descriptionBlock__afoRY",d=e(4374),l=e(885),p=e(184),f=function(t){var s=(0,a.useState)(!1),e=(0,l.Z)(s,2),n=e[0],i=e[1],r=(0,a.useState)(t.status),o=(0,l.Z)(r,2),u=o[0],c=o[1];(0,a.useEffect)((function(){c(t.status)}),[t.status]);return(0,p.jsxs)("div",{children:[!n&&(0,p.jsx)("div",{children:(0,p.jsx)("span",{onDoubleClick:function(){i(!0)},children:t.status||"_______"})}),n&&(0,p.jsx)("div",{children:(0,p.jsx)("input",{value:u,onChange:function(t){c(t.currentTarget.value)},onBlur:function(){i(!1),t.updateStatus(u)},autoFocus:!0})})]})},h=function(t){return t.profile?(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{children:(0,p.jsx)("img",{src:"https://wiotto.com/backend/webcontent/kcfinder/images/images/Maldives_Beach_1.jpg",alt:""})}),(0,p.jsxs)("div",{className:c,children:["ava + descr",(0,p.jsx)(f,{status:t.status,updateStatus:t.updateStatus})]})]}):(0,p.jsx)(d.Z,{})},x=e(4136),m="MyPosts_postsBlock__Vz0l5",j="MyPosts_posts__ol92P",v="Post_item__5y2Ww",_=function(t){return(0,p.jsxs)("div",{className:v,children:[(0,p.jsx)("img",{src:"https://www.mirf.ru/wp-content/uploads/2020/09/1480331127-scaled.jpg",alt:""}),t.message,(0,p.jsxs)("div",{children:[(0,p.jsx)("span",{children:"like"})," ",t.likesCount]})]})},g=e(6139),P=e(704),w=e(3079),k=e(1117),S=(0,w.D)(10),Z=a.memo((function(t){return console.log("Render"),(0,p.jsxs)("form",{onSubmit:t.handleSubmit,children:[(0,p.jsx)("div",{children:(0,p.jsx)(g.Z,{type:"text",name:"newPostText",component:k.gx,placeholder:"Post message",validate:[w.C,S]})}),(0,p.jsx)("div",{children:(0,p.jsx)("button",{children:"Add post"})})]})})),y=(0,P.Z)({form:"ProfileAddNewPostForm"})(Z),C=function(t){var s=t.posts.map((function(t){return(0,p.jsx)(_,{message:t.message,likesCount:t.likesCount},t.id)}));return(0,p.jsxs)("div",{className:m,children:[(0,p.jsx)("h3",{children:"My posts"}),(0,p.jsx)(y,{onSubmit:function(s){t.addPost(s.newPostText)}}),(0,p.jsx)("div",{className:j,children:s})]})},b=e(364),N=(0,b.$j)((function(t){return{posts:t.profilePage.posts,newPostText:t.profilePage.newPostText}}),(function(t){return{addPost:function(s){return t((0,x.Wl)(s))}}}))(C),I=function(t){return(0,p.jsxs)("div",{children:[(0,p.jsx)(h,{profile:t.profile,status:t.status,updateStatus:t.updateStatus}),(0,p.jsx)(N,{})]})},M=e(9271),T=e(7781),A=function(t){(0,o.Z)(e,t);var s=(0,u.Z)(e);function e(){return(0,i.Z)(this,e),s.apply(this,arguments)}return(0,r.Z)(e,[{key:"componentDidMount",value:function(){var t=this.props.match.params.userId?+this.props.match.params.userId:27595;t||(t=this.props.authorizedUserId),this.props.getUserProfile(t),this.props.getStatus(t)}},{key:"render",value:function(){return(0,p.jsx)(I,(0,n.Z)((0,n.Z)({},this.props),{},{profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus}))}}]),e}(a.Component),B=(0,T.qC)(M.EN,(0,b.$j)((function(t){return{profile:t.profilePage.profile,status:t.profilePage.status,authorizedUserId:t.auth.id,isAuth:t.auth.isAuth}}),{getUserProfile:x.et,getStatus:x.lR,updateStatus:x.Nf}))(A)}}]);
//# sourceMappingURL=528.4c93ab33.chunk.js.map