export interface Product {
    changed: string;
    comment: string;
    created: string;
    language: string;
    nid: string;
    promote: string;
    status: string;
    sticky: string;
    body?: string;
    safeEmailBody? : string;
    safetyLabel?: string;
    productLabel?: string;
    productLine?: string;    
    productLinePDF?: string;        
    specLabel?: string;       
    vidUrl?:string; 
    title: string;
    tnid: string;
    translate: string;
    filepath? : string; 
    type: string;
    uid: string;
    vid: string;
}

export interface ProductLabel {
    bundle: string;
    deleted: string;
    delta: string;
    entity_id: string;
    entity_type: string;
    field_product_label_description: string;
    field_product_label_display: string;
    field_product_label_fid: string;
    language: string;
    revision_id: string;
}

export interface ShareTv {
    bundle: string;
    deleted: string;
    delta: string;
    entity_id: string;
    entity_type: string;
    field_sharecorptv_description: string;
    field_sharecorptv_display: string;
    field_sharecorptv_fid: string;
    language: string;
    revision_id: string;
}

export interface VideoLink {
    bundle: string;
    deleted: string;
    delta: string;
    entity_id: string;
    entity_type: string;
    field_video_url_format: string;
    field_video_url_value: string;
    language: string;
    revision_id: string;    
} 

export interface Category {
    description: string;
    format: string;
    name: string;
    tid: string;
    subCategory? : Product[];
    imageReference: string;    
    imageId: string;
    vid: string;
    weight: string;
}
export interface CategoryImage {
    bundle: string;
    deleted: string;
    delta: string;
    entity_id: string;
    entity_type: string;
    field_category_image_alt: string;
    field_category_image_fid: string;
    field_category_image_height: string;
    field_category_image_title: string;
    field_category_image_width: string;
    language: string;
    revision_id: string;
}

export interface File {
    fid: string;
    filemime: string;
    filename: string;
    filesize: string;
    status: string;
    timestamp: string;
    uid: string;
    uri: string;
  }

  export interface ProductImage {
    bundle: string;
    deleted: string;
    delta: string;
    entity_id: string;
    entity_type: string;
    field_image_fid? : string;
    field_product_image_alt: string;
    field_product_image_fid: string;
    field_product_image_height: string;
    field_product_image_title: string;
    field_product_image_width: string;
    language: string;
    revision_id: string;
}

export interface ProductBody {
    body_format: string;
    body_summary: string;
    body_value: string;
    bundle: string;
    deleted: string;
    delta: string;
    entity_id: string;
    entity_type: string;
    language: string;
    revision_id: string;
}

export interface SafetyLabel {
    bundle: string;
    deleted: string;
    delta: string;
    entity_id: string;
    entity_type: string;
    field_safety_data_sheet_sds__description: string;
    field_safety_data_sheet_sds__display: string;
    field_safety_data_sheet_sds__fid: string;
    language: string;
    revision_id: string;
}

export interface SpecLabel {
    bundle: string;
    deleted: string;
    delta: string;
    entity_id: string;
    entity_type: string;
    field_attached_files_description: string;
    field_attached_files_display: string;
    field_attached_files_fid: string;
    language: string;
    revision_id: string;
}