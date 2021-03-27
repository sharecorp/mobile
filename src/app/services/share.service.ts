import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Observable } from "rxjs";
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';

declare var require: any

// manual
var node = require('../../assets/data/node.json');
var videoUrl = require('../../assets/data/field_data_field_video_url.json');
var shareCorpTv = require('../../assets/data/field_data_field_sharecorptv.json');
var fieldLink = require('../../assets/data/field_data_field_link.json');
var productLabel = require('../../assets/data/field_data_field_product_label.json');
var attachedFiles = require('../../assets/data/field_data_field_attached_files.json');
var sds = require('../../assets/data/field_data_field_safety_data_sheet_sds_.json');
var files = require('../../assets/data/file_managed.json');
var taxoTerm = require('../../assets/data/taxonomy_term_data.json');
var category = require('../../assets/data/field_data_field_product_category.json');
var image = require('../../assets/data/field_data_field_image.json');
var prodImage = require('../../assets/data/field_data_field_product_image.json');
var body = require('../../assets/data/field_data_body.json');
var catImage = require('../../assets/data/field_data_field_category_image.json');

import { Product, SpecLabel, ProductLabel, SafetyLabel, Category, CategoryImage, File, ProductImage, ProductBody, ShareTv, VideoLink } from '../models/models';

@Injectable()

export class ShareService {
    private url: string;

    // static data stores
    private files: Subject<File[]> = new Subject();
    private raw_files: File[];

    private product: Subject<Product> = new Subject();

    private products: Subject<Product[]> = new Subject();
    private raw_products: Product[];

    private productLines: Subject<Product[]> = new Subject();
    private raw_productLines: Product[];

    private fieldImage: Subject<ProductImage[]> = new Subject();
    private raw_fieldImage: ProductImage[];

    private productCategoryMappings: Subject<any[]> = new Subject();
    private raw_productCategoryMappings: any[];

    private categories: Subject<Category[]> = new Subject();
    private raw_Categories: Category[];

    private productLineLink: Subject<any[]> = new Subject();
    private raw_productLineLink: any[];

    private shareTv: Subject<VideoLink[]> = new Subject();
    private raw_shareTv: VideoLink[];

    private shareTvLegacy: Subject<VideoLink[]> = new Subject();
    private raw_shareTvLegacy: VideoLink[];

    private shareTvUrl: Subject<any[]> = new Subject();
    private raw_shareTvUrl: any[];

    private categoriesImg: Subject<CategoryImage[]> = new Subject();
    private raw_CategoriesImg: CategoryImage[];

    private safetyLabel: Subject<SafetyLabel[]> = new Subject();
    private raw_safetyLabel: SafetyLabel[];

    private specLabel: Subject<SpecLabel[]> = new Subject();
    private raw_specLabel: SpecLabel[];

    private productLabel: Subject<ProductLabel[]> = new Subject();
    private raw_productLabel: ProductLabel[];

    private productImg: Subject<ProductImage[]> = new Subject();
    private raw_productImg: ProductImage[];

    private productBody: Subject<ProductBody[]> = new Subject();
    private raw_productBody: ProductBody[];

    constructor(private http: Http, private platform: Platform) {

        // swap path url based on environment
        if (this.platform.is('cordova') && this.platform.is('android')) {
            this.url = "/android_asset/www/";
        } else if (this.platform.is('cordova') && this.platform.is('ios')) {
            this.url = 'http://localhost:8100/bundle/www/';
        } else {
            this.url = 'assets/data/';
        }

        // on load cache all data for quick retrieval as we don't have a database
        this.cacheData();
    }

    cacheData(): void {
        // get products
        var products = node[2].data
            .filter(p => p.type == "products" && p.status == 1)
            // sort a > z
            .sort((a, b) => {
                if (a.title < b.title) return -1;
                if (a.title > b.title) return 1;
                return 0;
            });
        this.raw_products = products;
        this.products.next(products);

        // get product lines
        var productLines = node[2].data.filter(p => p.type == "product_lines" && p.status == 1)
            .sort((a, b) => {
                if (a.title < b.title) return -1;
                if (a.title > b.title) return 1;
                return 0;
            });
            
        this.raw_productLines = productLines;
        this.productLines.next(productLines);

        // get share tv
        this.raw_shareTv = videoUrl[2].data;
        this.shareTv.next(videoUrl[2].data);

        // get legacy share tv
        this.raw_shareTvLegacy = shareCorpTv[2].data;
        this.shareTvLegacy.next(shareCorpTv[2].data);

        // get sharetv vid urls
        this.raw_shareTv = videoUrl[2].data;
        this.shareTv.next(videoUrl[2].data);

        // get sharetv vid urls
        this.raw_shareTvUrl = shareCorpTv[2].data;
        this.shareTvUrl.next(shareCorpTv[2].data);

        // get product line links
        this.raw_productLineLink = fieldLink[2].data;
        this.productLineLink.next(fieldLink[2].data);

        // get product labels
        this.raw_productLabel = productLabel[2].data;
        this.productLabel.next(productLabel[2].data);

        // get attached labels
        this.raw_specLabel = attachedFiles[2].data;
        this.specLabel.next(attachedFiles[2].data);

        // get safety labels
        this.raw_safetyLabel = sds[2].data;
        this.safetyLabel.next(sds[2].data);

        // get files
        this.raw_files = files[2].data;
        this.files.next(files[2].data);

        // get product images
        this.raw_productImg = prodImage[2].data;
        this.productImg.next(prodImage[2].data);

        // get product line images
        this.raw_fieldImage = image[2].data;
        this.fieldImage.next(image[2].data);

        // get product categories
        this.raw_productCategoryMappings = category[2].data;
        this.productCategoryMappings.next(category[2].data);

        // get product bodies
        this.raw_productBody = body[2].data;
        this.productBody.next(body[2].data);
    }

    getProduct(id): Observable<Product> {
        let product: Product = this.raw_products.find(p => p.nid == id);

        // get product image 
        let productFileId = this.getProductImageId(id);
        product.filepath = this.getImageFilePath(productFileId);

        // get product body description
        product.body = this.getProductBody(id);

        // get safety label
        product.safetyLabel = this.getSafetyLabel(id);

        // get product label
        product.productLabel = this.getProductLabel(id);

        // get specification label
        product.specLabel = this.getSpecLabel(id);

        // return our product
        return new Observable<Product>(observer => {
            observer.next(product);
        });
    }

    getProductLines(): Observable<Product[]> {
        // Mobile specific overrides for product line PDFS
        const productLineOverridesByNId = {
            "13" : "hercules.pdf", // hercules
            "724" : "" // ORS nasco
        }

        // GET ONLY ACTIVE PRODUCT LINKS
        var activeProductLineEntityIds = this.raw_productLineLink.map(pl => pl.entity_id);
        this.raw_productLines = this.raw_productLines.filter(pl => activeProductLineEntityIds.includes(pl.nid));

        this.raw_productLines.forEach(pl => {
            pl.filepath = this.getImageFilePath(this.getProductLineImageId(pl.nid));
        });

        this.raw_productLines.forEach(pl => {
            pl.productLine = this.getProductLineLabelImage(pl.nid);
        });

        this.raw_productLines.forEach(pl => {
            pl.productLinePDF = this.getProductLineLabelPDF(pl.nid);
        });

        return new Observable<Product[]>(observer => {
            observer.next(this.raw_productLines);
        });
    }

    getProductList(): Observable<Product[]> {
        return new Observable<Product[]>(observer => {
            observer.next(this.raw_products);
        });
    }

    getShareTvList(): Observable<Product[]> {
        // collect ids of all share tv videos
        var shareTvIds = this.raw_shareTv.map(sTv => sTv.entity_id);
        var shareTvLegacyIds = this.raw_shareTvLegacy.map(sTv => sTv.entity_id);

        // join ids to raw_products to make video list
        let videos = this.raw_products.filter((p) => shareTvIds.includes(p.nid))
        let videosLegacy = this.raw_products.filter((p) => shareTvLegacyIds.includes(p.nid))


        // loop through each video
        videos.forEach(v => {
            // get video image
            let productFileId = this.getProductImageId(v.nid);
            v.filepath = this.getImageFilePath(productFileId);
            v.vidUrl = this.getVideoUrl(v.nid);
        });

        // loop through each legacy video
        videosLegacy.forEach(v => {
            // get video image
            let productFileId = this.getProductImageId(v.nid);
            v.filepath = this.getImageFilePath(productFileId);
            v.vidUrl = this.getVideoUrl(v.nid);
        });

        // combine the two lists
        videos = Array.from(new Set(videos.concat(videosLegacy)))
            .sort((a: any, b: any) => {
                // sort by name
                if (a.title < b.title) {
                    return -1;
                } else if (a.title > b.title) {
                    return 1;
                } else {
                    return 0;
                }
            });
        return new Observable<Product[]>(observer => {
            observer.next(videos);
        });
    }

    getProductLineLabelImage(id): string {
        let productLineId = this.raw_productLines.find(p => p.nid == id);

        if (!productLineId) return;
    }


    getProductLineLabelPDF(id): string {
        if (this.raw_productLineLink.find(p => p.entity_id == id)) {
            let productLineLink = this.raw_productLineLink.find(p => p.entity_id == id).field_link_url;
            return productLineLink.substr(productLineLink.lastIndexOf('/') + 1);
        }
    }

    getSpecLabel(id): string {
        let specLabelId = this.raw_specLabel.find(p => p.entity_id == id);

        if (!specLabelId) return;
        return this.raw_files.find(f => f.fid == specLabelId.field_attached_files_fid).filename;
    }

    getShareTvImage(id): string {
        // join to share tv references to get fid
        // use fid to grab 
        if (!id) return;
        return this.raw_files.find(f => f.fid == id.field_safety_data_sheet_sds__fid).filename;
    }

    getVideoUrl(id): string {
        // join to share tv references to get vid url
        if (!id) return;
        // find MP4 path
        let shareTvId = this.raw_shareTvUrl.find(sTv => sTv.entity_id == id).field_sharecorptv_fid;
        if (this.raw_files.find(f => f.fid == shareTvId))
            return this.raw_files.find(f => f.fid == shareTvId).filename;
    }

    getSafetyLabel(id): string {
        let safetyLabelId = this.raw_safetyLabel.find(p => p.entity_id == id);

        if (!safetyLabelId) return;
        return this.raw_files.find(f => f.fid == safetyLabelId.field_safety_data_sheet_sds__fid).filename;
    }

    getProductLabel(id): string {
        let productLabelId = this.raw_productLabel.find(p => p.entity_id == id);

        if (!productLabelId) return;
        return this.raw_files.find(f => f.fid == productLabelId.field_product_label_fid).filename;
    }

    getProductImageId(id): string {
        return this.raw_productImg.find(p => p.entity_id == id).field_product_image_fid;
    }

    getProductLineImageId(id): string {
        return this.raw_fieldImage.find(p => p.entity_id == id).field_image_fid;
    }

    getImageFilePath(id): string {
        console.error(id);
        return this.raw_files.find(f => f.fid == id).filename;
    }

    getProductBody(id): string {
        return this.raw_productBody.find(f => f.entity_id == id).body_value;
    }

    getProductsInCategory(id): Observable<Product[]> {
        // get all the product ids on the passed in category id
        let filteredProductsByCategory: string[] = this.raw_productCategoryMappings
            .filter(p => p.field_product_category_tid == id)
            .map(p => p.entity_id);

        // return the products with those ids
        return new Observable<Product[]>(observer => {
            observer.next(this.raw_products.filter(p => filteredProductsByCategory.includes(p.nid)));
        });
    }

    getCategories(): Observable<Category[]> {
        // file paths
        this.raw_Categories = taxoTerm[2].data.filter(c => c.vid == 2);
        this.raw_CategoriesImg = catImage[2].data;
        let images = files[2].data;

        this.raw_Categories.forEach(category => {
            let imagePath = this.raw_CategoriesImg.find(categoryImage => categoryImage.entity_id == category.tid);
            if (imagePath) {
                category.imageId = imagePath.field_category_image_fid || '';
            }
            category.imageReference = images.find(image => image.fid == category.imageId);
        });
        
        this.categories.next(this.raw_Categories);
        return this.categories.asObservable();
    }
}