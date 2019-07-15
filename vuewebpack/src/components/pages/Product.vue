<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="text-right">
            <button 
                type="button"
                class="btn btn-primary mt-4" 
                @click="openModal(true)"
            >建立新產品</button>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th width="120">分類</th>
                    <th>產品名稱</th>
                    <th width="50">原價</th>
                    <th width="80">售價</th>
                    <th width="100">是否啟用</th>
                    <th width="80">編輯</th>
                    <th width="90">刪除產品</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in products" :key="item.id" >
                    <td>{{ item.category }}</td>
                    <td>{{ item.title }}</td>
                    <td class="text-left">
                        {{ item.origin_price }}
                    </td>
                    <td class="text-left">
                        {{ item.price }}
                    </td>
                    <td>
                        <span v-if="item.is_enabled" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm"  
                        @click="openModal(false, item)">編輯</button>
                    </td>
                    <td>
                        <button class="btn btn-outline-danger btn-sm" data-target="#delProductModal" @click="deletModal(item)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <Pagination @changePage="getProduct" :pagination="pagination"></Pagination>
        <!-- Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>新增產品</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                        <label for="image">輸入圖片網址</label>
                        <input type="text" class="form-control" id="image"
                            v-model="tempProduct.imageUrl"
                            placeholder="請輸入圖片連結">
                        </div>
                        <div class="form-group">
                        <label for="customFile">或 上傳圖片
                            <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                        </label>
                        <input type="file" id="customFile" class="form-control" ref="files" @change="uploadFile">
                        </div>
                        <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                        class="img-fluid" :src="tempProduct.imageUrl" alt="">
                    </div>
                    <div class="col-sm-8">
                        <div class="form-group">
                        <label for="title">標題</label>
                        <input type="text" class="form-control" id="title"
                            placeholder="請輸入標題"
                            v-model="tempProduct.title"
                            >
                        </div>

                        <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="category">分類</label>
                            <input type="text" class="form-control" id="category"
                            placeholder="請輸入分類"
                            v-model="tempProduct.category">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">單位</label>
                            <input type="unit" class="form-control" id="unit"
                            placeholder="請輸入單位"
                            v-model="tempProduct.unit">
                        </div>
                        </div>

                        <div class="form-row">
                        <div class="form-group col-md-6">
                        <label for="origin_price">原價</label>
                            <input type="number" class="form-control" id="origin_price"
                            placeholder="請輸入原價"
                            v-model="tempProduct.origin_price">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">售價</label>
                            <input type="number" class="form-control" id="price"
                            placeholder="請輸入售價"
                            v-model="tempProduct.price">
                        </div>
                        </div>
                        <hr>

                        <div class="form-group">
                        <label for="description">產品描述</label>
                        <textarea type="text" class="form-control" id="description"
                            v-model="tempProduct.description"
                            placeholder="請輸入產品描述"></textarea>
                        </div>
                        <div class="form-group">
                        <label for="content">說明內容</label>
                        <textarea type="text" class="form-control" id="content"
                            v-model="tempProduct.content"
                            placeholder="請輸入產品說明內容"></textarea>
                        </div>
                        <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox"
                            v-model="tempProduct.is_enabled"
                            :true-value="1"
                            :false-value="0"
                            id="is_enabled">
                            <label class="form-check-label" for="is_enabled">
                            是否啟用
                            </label>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
                </div>
                </div>
            </div>
            </div>
            <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>刪除產品</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger" @click="deleteProduct"
                    >確認刪除</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/* global $ */
import $ from 'jquery'
import Pagination from '../Pagination'

export default {
    components: {
        Pagination,
    },
    data(){
        return{
            products: [],
            tempProduct: {},
            pagination: {},
            isNew: false,
            isLoading: false,
            //font-aweson
            status: {
                fileUploading: false
            },
        }
    },
    methods: {
        getProduct(page = 1) {
            const vm = this;
            const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products?page=${page}`;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                // console.log('products',response.data.products)
                vm.isLoading = false;
                vm.products = response.data.products;
                vm.pagination = response.data.pagination;
            })
        },
        openModal(isNew, item) {
            // const vm = this;
            if( isNew ){
                this.tempProduct = {};
                this.isNew = true;
            }else{
                /*
                    如果在目標物件裡的屬性名稱(key)和來源物件的屬性名稱相同，將會被覆寫。
                    若來源物件之間又有相同的屬性名稱，則後者會將前者覆寫。
                    https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
                */
                vm.tempProduct = Object.assign({},item);
                vm.isNew = false;
            }
            $('#productModal').modal('show');
        },
        updateProduct() {
            const vm = this;
            let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/product`;
            let httpMethod = 'post';
            if(!vm.isNew){
                api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`;
                httpMethod = 'put';
            }
            this.$http[httpMethod](api, {data: vm.tempProduct}).then((response) => {
                if( response.data.success ){
                    // console.log('response.data.success',response)
                    $('#productModal').modal('hide');
                    vm.getProduct();
                    console.log('新增成功')
                    this.$bus.$emit('message:push', response.data.message, 'success')
                }else{
                    $('#productModal').modal('hide');
                    vm.getProduct();
                    console.log('新增失敗')
                    this.$bus.$emit('message:push', response.data.message, 'danger')
                }
            })
        },
        uploadFile () {
            const vm = this;
            const uploadFiled = this.$refs.files.files[0];
            const formData = new FormData();
            formData.append('file-to-upload', uploadFiled);
            const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/upload`;
            vm.status.fileUploading = true;
            this.$http.post(url, formData,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                }
            }).then((response) => {
                console.log('uploadFile', response.data);
                vm.status.fileUploading = false;
                if( response.data.success){
                    // vm.tempProduct.imageUrl = response.data.imageUrl;
                    vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
                }else{
                    this.$bus.$emit('message:push', response.data.message, 'danger')
                }
            })
        },
        deletModal(item) {
            this.tempProduct = Object.assign({}, item) // 淺拷貝點擊當前的項目出來改變
            $('#delProductModal').modal('show')
        },
        deleteProduct () {
            const vm = this;
            let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`;
            this.$http.delete(api).then((response) => {
                if( response.data.success ){
                    vm.getProduct();
                    $('#delProductModal').modal('hide');
                    console.log('刪除成功');
                    this.$bus.$emit('message:push', response.data.message, 'success')
                }else{
                    vm.getProduct();
                    $('#delProductModal').modal('hide');
                    console.log('刪除失敗');
                    this.$bus.$emit('message:push', response.data.message, 'danger')
                }
            })
        },
    },
    created() {
        this.getProduct();
        //AlertMessage
        // this.$bus.$emit('message:push', 'test', 'success')
    },
}
</script>