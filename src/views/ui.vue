<template>
  <div class="zz-page-body signature-page">
    <div class="zz-tab zz-tab_inios">
      <z-header>测试标题</z-header>
      <div class="zz-tab__panel zz-tab__panel_hastabbar">
        <div>
          <popup v-model="popupStatus1">
            <div class="zz-cells">
              <div class="zz-cell">
                <div class="zz-cell__hd">标题文字</div>
                <div class="zz-cell__bd">
                  <p>内容文字</p>
                </div>
                <div class="zz-cell__ft">说明文字
                  <span class="zz-badge zz-badge_dot"></span>
                </div>
              </div>
              <div class="zz-cell zz-cell_swiped">
                <div class="zz-cell__bd"
                  style="transform: translateX(-1.2rem)">
                  <div class="zz-cell">
                    <div class="zz-cell__hd">标题文字</div>
                    <div class="zz-cell__bd">
                      <p>内容文字</p>
                    </div>
                    <div class="zz-cell__ft">说明文字</div>
                  </div>
                </div>
                <div class="zz-cell__ft">
                  <div class="zz-swiped-btn zz-swiped-btn_default">删除</div>
                  <div class="zz-swiped-btn zz-swiped-btn_warn">删除</div>
                </div>
              </div>
              <div class="zz-cell zz-cell_access">
                <div class="zz-cell__hd">标题文字</div>
                <div class="zz-cell__bd">
                  <p>内容文字</p>
                </div>
                <div class="zz-cell__ft">说明文字
                  <span class="zz-badge zz-badge_dot"></span>
                </div>
              </div>
              <div class="zz-cell">
                <div class="zz-cell__hd">
                  <img src="../assets/demo/icon_tabbar.png"
                    style="display: block;width: .6rem;">
                </div>
                <div class="zz-cell__bd">
                  <p>内容文字内容文字内容文字内容文字内容文字内容文字</p>
                </div>
                <div class="zz-cell__ft">footer</div>
              </div>
              <div class="zz-cell zz-cell_access">
                <div class="zz-cell__hd">
                  <img src="../assets/demo/icon_tabbar.png"
                    style="display: block;width: .8rem;">
                </div>
                <div class="zz-cell__bd">
                  <p>内容文字内容文字内容文字内容文字内容文字内容文字</p>
                </div>
                <div class="zz-cell__ft">footer</div>
              </div>
              <div class="zz-cell">
                <div class="zz-cell__hd">
                  <img src="../assets/demo/icon_tabbar.png"
                    style="display: block;width: .8rem;">
                </div>
                <div class="zz-cell__bd">
                  <p>内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字文字</p>
                </div>
                <div class="zz-cell__ft">footer</div>
              </div>
            </div>
          </popup>
        </div>
        <p>picker</p>
        <div class="zz-picker">
          <div class="zz-picker-hd">
            <div class="zz-picker-action">
              <a href="javascript:;"
                class="zz-picker-btn">取消</a>
              <div class="zz-picker-title"></div>
              <a href="javascript:;"
                class="zz-picker-btn">确定</a>
            </div>
          </div>
          <div class="zz-picker-bd">
            <div class="zz-picker-group">
              <div class="zz-picker-mask"></div>
              <div class="zz-picker-indicator"></div>
              <div class="zz-picker-content">
                <div class="zz-picker-item">选项一</div>
                <div class="zz-picker-item">选项二</div>
                <div class="zz-picker-item">选项三</div>
              </div>
            </div>
            
            <div class="zz-picker-group">
              <div class="zz-picker-mask"></div>
              <div class="zz-picker-indicator"></div>
              <div class="zz-picker-content">
                <div class="zz-picker-item">选项一</div>
                <div class="zz-picker-item">选项二</div>
                <div class="zz-picker-item">选项三</div>
                <div class="zz-picker-item">选项二</div>
                <div class="zz-picker-item">选项四</div>
              </div>
            </div>
          </div>
          <div class="zz-picker-ft"></div>
        </div>
        <!-- <div class="zz-picker">
          <div class="zz-picker-hd">
            <div class="zz-picker-action">
              <div class="zz-picker-title">银行卡选择</div>
            </div>
          </div>
          <div class="zz-picker-bd"
            style="display: block;">
            <div class="zz-cells zz-cells-radio"
              style="margin-top: 0;">
              <label class="zz-cell zz-check-label"
                for="rr1">
                <div class="zz-cell-hd">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
                </div>
                <div class="zz-cell-bd">中国银行</div>
                <div class="zz-cell-ft">
                  <input class="zz-radio"
                    type="radio"
                    name="radio2"
                    id="rr1">
                  <i class="icon ion-android-done"></i>
                </div>
              </label>
              <label class="zz-cell zz-check-label"
                for="rr2">
                <div class="zz-cell-hd">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
                </div>
                <div class="zz-cell-bd">平安银行</div>
                <div class="zz-cell-ft">
                  <input class="zz-radio"
                    type="radio"
                    name="radio2"
                    id="rr2">
                  <i class="icon ion-android-done"></i>
                </div>
              </label>
              <label class="zz-cell zz-check-label"
                for="rr3">
                <div class="zz-cell-hd">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
                </div>
                <div class="zz-cell-bd">兴业银行</div>
                <div class="zz-cell-ft">
                  <input class="zz-radio"
                    type="radio"
                    name="radio2"
                    id="rr3">
                  <i class="icon ion-android-done"></i>
                </div>
              </label>
            </div>
            <div class="zz-cells"
              style="margin-top: 0;">
              <div class="zz-cell zz-cell-access">
                <div class="zz-cell-hd">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="
                    style="display: block;">
                </div>
                <div class="zz-cell-bd">
                  <p>增加银行卡</p>
                </div>
                <div class="zz-cell-ft">
                </div>
              </div>
            </div>
          </div>
          <div class="zz-picker-ft"></div>
        </div> -->
        <p>component cell</p>
        <cells>
          <cell value="文本值">
            <p slot="hd">标题文字</p>
            <div slot="bd">
              <p>内容文字</p>
              <span style="font-size:.24rem;color:#ababab;">描述内容xxxx123213</span>
            </div>
            <!-- <div>
              期望恶趣味<span class="zz-badge">6</span>
            </div> -->
          </cell>
          <div>
            <p>123123123</p>
            <p>432432qweqweqw</p>
            <p>诶剧情请我地就回去我i额239 爱丽丝肯定会</p>
          </div>
        </cells>
        <p>component button</p>
        <div style="margin: .1rem .3rem;">
          <z-button @click.native="popupStatus1 = true">按钮 default</z-button>
          <z-button status="loading">default loading</z-button>
          <z-button status="disabled">default disabled</z-button>
          <z-button type="primary">按钮 primary</z-button>
          <z-button type="primary"
            status="loading">primary loading</z-button>
          <z-button type="primary"
            status="disabled"
            :disabled="true">primary disabled</z-button>
          <z-button type="warn">按钮 wran</z-button>
          <z-button type="warn"
            status="loading">按钮 wran</z-button>
          <z-button type="warn"
            status="disabled">按钮 wran</z-button>
        </div>
        <p>button group</p>
        <button-group>
          <z-button mini>按钮 default</z-button>
          <z-button status="loading"
            mini>default loading</z-button>
          <z-button status="disabled"
            mini>default disabled</z-button>
          <z-button type="primary"
            mini>按钮 primary</z-button>
          <z-button type="primary"
            mini
            status="loading">primary loading</z-button>
          <z-button mini
            type="primary"
            status="disabled"
            :disabled="true">primary disabled</z-button>
        </button-group>
        <p>component grids</p>
        <grid :cols="4">
          <grid-item v-for="x in 5"
            :key="x"
            @on-item-click="popupStatus = true">grid:{{x}}</grid-item>
          <!-- <grid-item>grid:1</grid-item>
          <grid-item>grid:1</grid-item>
          <grid-item>grid:1</grid-item>
          <grid-item>grid:1</grid-item>
          <grid-item>grid:1</grid-item> -->
        </grid>
        <p>component popup</p>
        <div class="zz-flex">
          <div class="zz-flex-item">
            <div class="demo-flex-item"
              @click="popupStatus = true">popup:{{popupStatus}}</div>
          </div>
        </div>
        <p>component flexbox</p>
        <flexbox :gutter="50">
          <flexbox-item v-for="i in 4"
            :flex="'1'"
            :key="i">
            <div class="demo-flex-item">{{'index:'+ i}}</div>
          </flexbox-item>
        </flexbox>
        <p>component flexbox</p>
        <flexbox>
          <flexbox-item :flex="'1'">
            <div class="demo-flex-item"
              @click="alertStatus = true">{{alertStatus}}</div>
          </flexbox-item>
          <flexbox-item :flex="'1'">
            <div class="demo-flex-item"
              @click="callPluginAlert">plugin Alert</div>
          </flexbox-item>
          <flexbox-item :flex="'1'">
            <div class="demo-flex-item"
              @click="confirmStatus = true">confirm:{{confirmStatus}}</div>
          </flexbox-item>
        </flexbox>
        <div class="zz-flex">
          <div class="zz-flex-item">
            <div class="demo-flex-item">1</div>
          </div>
          <div class="zz-flex-item">
            <div class="demo-flex-item">2</div>
          </div>
          <div class="zz-flex-item">
            <div class="demo-flex-item">3</div>
          </div>
          <div class="zz-flex-item">
            <div class="demo-flex-item">4</div>
          </div>
        </div>
        <p>component grids</p>
        <!-- <grid :cols="3">
          <grid-item v-for="i in 5"
            :key="i">{{i}}</grid-item>
        </grid> -->
        <p>grids</p>
        <div class="zz-grids zz-grids_4">
          <div class="zz-grid">1</div>
          <div class="zz-grid">2</div>
          <div class="zz-grid">3</div>
          <div class="zz-grid">4</div>
          <div class="zz-grid">5</div>
          <div class="zz-grid">3</div>
        </div>
        <div class="zz-grids">
          <div class="zz-grid">1</div>
          <div class="zz-grid">2</div>
          <div class="zz-grid">3</div>
          <div class="zz-grid">4</div>
          <div class="zz-grid">5</div>
          <div class="zz-grid">3</div>
        </div>
        <p>divider</p>
        <div class="zz-divider">
          <span class="zz-divider__tips">
            <i class="iconfont icon-loading iconfont_rotate"></i>数据正在加载中</span>
        </div>
        <div class="zz-divider zz-divider_dot"></div>
        <!-- 基本按钮 -->
        <p>基本按钮</p>
        <input class="zz-btn"
          type="button"
          name=""
          value="zz-btn_button">
        <button class="zz-btn zz-btn_default">default_button</button>
        <button class="zz-btn zz-btn_warn">warn_button</button>
        <!-- disabled 按钮 -->
        <p>disabled按钮</p>
        <input class="zz-btn zz-btn_disabled"
          type="button"
          name=""
          value="disabled_button">
        <button class="zz-btn zz-btn_default zz-btn_disabled">disabled_default_button</button>
        <button class="zz-btn zz-btn_warn zz-btn_disabled">disabled_warn_button</button>
        <p>iconfont按钮</p>
        <button class="zz-btn zz-btn_default">
          <i class="iconfont icon-loading iconfont_rotate"></i>
          loading按钮
        </button>
        <button class="zz-btn zz-btn_warn">
          <i class="iconfont icon-loading iconfont_rotate"></i>
          warn_loading按钮
        </button>
        <button class="zz-btn zz-btn_default zz-btn_disabled">
          <i class="iconfont icon-loading iconfont_rotate"></i>
          disabled_loading按钮
        </button>
        <p>cell</p>
        <div class="zz-cells__title">cell标题</div>
        <div class="zz-cells">
          <div class="zz-cell">
            <div class="zz-cell__hd">标题文字</div>
            <div class="zz-cell__bd">
              <p>内容文字</p>
            </div>
            <div class="zz-cell__ft">说明文字
              <span class="zz-badge zz-badge_dot"></span>
            </div>
          </div>
          <div class="zz-cell zz-cell_swiped">
            <div class="zz-cell__bd"
              style="transform: translateX(-1.2rem)">
              <div class="zz-cell">
                <div class="zz-cell__hd">标题文字</div>
                <div class="zz-cell__bd">
                  <p>内容文字</p>
                </div>
                <div class="zz-cell__ft">说明文字</div>
              </div>
            </div>
            <div class="zz-cell__ft">
              <div class="zz-swiped-btn zz-swiped-btn_default">删除</div>
              <div class="zz-swiped-btn zz-swiped-btn_warn">删除</div>
            </div>
          </div>
          <div class="zz-cell zz-cell_access">
            <div class="zz-cell__hd">标题文字</div>
            <div class="zz-cell__bd">
              <p>内容文字</p>
            </div>
            <div class="zz-cell__ft">说明文字
              <span class="zz-badge zz-badge_dot"></span>
            </div>
          </div>
          <div class="zz-cell">
            <div class="zz-cell__hd">
              <img src="../assets/demo/icon_tabbar.png"
                style="display: block;width: .6rem;">
            </div>
            <div class="zz-cell__bd">
              <p>内容文字内容文字内容文字内容文字内容文字内容文字</p>
            </div>
            <div class="zz-cell__ft">footer</div>
          </div>
          <div class="zz-cell zz-cell_access">
            <div class="zz-cell__hd">
              <img src="../assets/demo/icon_tabbar.png"
                style="display: block;width: .8rem;">
            </div>
            <div class="zz-cell__bd">
              <p>内容文字内容文字内容文字内容文字内容文字内容文字</p>
            </div>
            <div class="zz-cell__ft">footer</div>
          </div>
          <div class="zz-cell">
            <div class="zz-cell__hd">
              <img src="../assets/demo/icon_tabbar.png"
                style="display: block;width: .8rem;">
            </div>
            <div class="zz-cell__bd">
              <p>内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字文字</p>
            </div>
            <div class="zz-cell__ft">footer</div>
          </div>
        </div>
      </div>
      <div class="zz-tabbar">
        <div class="zz-tabbar__item zz-tabbar__item_active">
          <div>
            <img src="../assets/demo/icon_tabbar.png"
              alt="">
            <span class="zz-badge">1</span>
          </div>
          <p>首页</p>
        </div>
        <div class="zz-tabbar__item">
          <div>
            <img src="../assets/demo/icon_tabbar.png"
              alt="">
            <span class="zz-badge">99+</span>
          </div>
          <p>首页</p>
        </div>
        <div class="zz-tabbar__item">
          <div>
            <img src="../assets/demo/icon_tabbar.png"
              alt="">
            <span class="zz-badge">88</span>
          </div>
          <p>首页</p>
        </div>
        <div class="zz-tabbar__item">
          <div>
            <img src="../assets/demo/icon_tabbar.png"
              alt="">
            <span class="zz-badge zz-badge_dot"></span>
          </div>
          <p>首页</p>
        </div>
      </div>
    </div>
    <!-- <z-dialog v-model="dialogStatus">
        <div class="zz-dialog__hd">
          <div class="zz-dialog-title">dialog标题</div>
        </div>
        <div class="zz-dialog__bd">
          dialog body
        </div>
        <div class="zz-dialog__ft">
          <div class="zz-dialog-btn"
            @click="dialogStatus = false">
            dialogBtn
          </div>
        </div>
      </z-dialog> -->
    <popup v-model="popupStatus">
      <div class="zz-cells">
        <div class="zz-cell">
          <div class="zz-cell__hd">标题文字</div>
          <div class="zz-cell__bd">
            <p>内容文字</p>
          </div>
          <div class="zz-cell__ft">说明文字
            <span class="zz-badge zz-badge_dot"></span>
          </div>
        </div>
        <div class="zz-cell zz-cell_swiped">
          <div class="zz-cell__bd"
            style="transform: translateX(-1.2rem)">
            <div class="zz-cell">
              <div class="zz-cell__hd">标题文字</div>
              <div class="zz-cell__bd">
                <p>内容文字</p>
              </div>
              <div class="zz-cell__ft">说明文字</div>
            </div>
          </div>
          <div class="zz-cell__ft">
            <div class="zz-swiped-btn zz-swiped-btn_default">删除</div>
            <div class="zz-swiped-btn zz-swiped-btn_warn">删除</div>
          </div>
        </div>
        <div class="zz-cell zz-cell_access">
          <div class="zz-cell__hd">标题文字</div>
          <div class="zz-cell__bd">
            <p>内容文字</p>
          </div>
          <div class="zz-cell__ft">说明文字
            <span class="zz-badge zz-badge_dot"></span>
          </div>
        </div>
        <div class="zz-cell">
          <div class="zz-cell__hd">
            <img src="../assets/demo/icon_tabbar.png"
              style="display: block;width: .6rem;">
          </div>
          <div class="zz-cell__bd">
            <p>内容文字内容文字内容文字内容文字内容文字内容文字</p>
          </div>
          <div class="zz-cell__ft">footer</div>
        </div>
        <div class="zz-cell zz-cell_access">
          <div class="zz-cell__hd">
            <img src="../assets/demo/icon_tabbar.png"
              style="display: block;width: .8rem;">
          </div>
          <div class="zz-cell__bd">
            <p>内容文字内容文字内容文字内容文字内容文字内容文字</p>
          </div>
          <div class="zz-cell__ft">footer</div>
        </div>
        <div class="zz-cell">
          <div class="zz-cell__hd">
            <img src="../assets/demo/icon_tabbar.png"
              style="display: block;width: .8rem;">
          </div>
          <div class="zz-cell__bd">
            <p>内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字文字</p>
          </div>
          <div class="zz-cell__ft">footer</div>
        </div>
      </div>
    </popup>
    <alert v-model="alertStatus"
      title="alert标题"
      button-text="按钮文本"
      @on-show="alertOnShow">
      传入的alert内容
    </alert>
    <confirm v-model="confirmStatus"
      title="confirmDomTitle"
      cancel-text="取消按钮"
      confirm-text="确定按钮"
      @on-show="confirmOnShow"
      @on-hide="confirmOnHide"
      @on-cancel="confirmOnCancel"
      @on-confirm="confirmOnConfirm">
      传入的confirm content部分
    </confirm>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dialogStatus: false,
        alertStatus: false,
        confirmStatus: false,
        popupStatus: false,
        popupStatus1: false
      }
    },
    methods: {
      confirmOnShow() {
        console.log('----confirmOnShow----')
      },
      confirmOnHide() {
        console.log('----confirmOnHide----')
      },
      confirmOnCancel() {
        console.log('----confirmOnCancel----')
      },
      confirmOnConfirm() {
        console.log('----confirmOnConfirm----')
      },
      alertOnShow() {
        console.log('alert on show')
      },
      alertEvent(text) {
      },
      callPluginAlert() {
        this.$zzz.alert.show({
          title: 'plugin title',
          content: 'content内容部分',
          buttonText: 'by plugin ok ?',
          onShow: () => {
          },
          onHide: () => {
            setTimeout(() => {
              this.alertStatus = true
            }, 2000)
          }
        })
      }
    },
    created() {
      // this.$zzz.toast.show({
      //   text: '正在校验签名',
      //   type: 'loading',
      //   position: 'middle',
      //   time: 0,
      //   isShowMask: true
      // })
      // this.$zzz.toast.show({
      //   text: '签名成功',
      //   type: 'done',
      //   position: 'middle',
      //   time: 0,
      //   isShowMask: true
      // })

    },
    mounted() {
      this.$nextTick(() => {
      })
    }
  }
</script>
<style lang="less" scoped>
  .zz-grid {
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
  }
  .zz-tab__panel {
    & > p {
      line-height: 0.6rem;
      padding: 0.3rem 0 0.1rem 0.3rem;
      font-size: 0.22rem;
    }
  }

  .zz-flex {
    width: 7rem;
    height: 0.8rem;
    margin: 0.15rem auto 0;
  }
  .demo-flex-item {
    // margin: 0.1rem;
    padding: 0.05rem 0.2rem;
    background-color: coral;
    text-align: center;
    border-radius: 10px;
  }
</style>
