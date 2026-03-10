import productsData from '../../data/products.json'

const TOTAL_PRODUCTS = 200
const EXTRA_FIELDS_COUNT = 140

// Generate realistic-sounding field names
const extraFieldNames = [
  'warehouse_location_code', 'internal_sku_hash', 'legacy_migration_timestamp',
  'supplier_contract_id', 'quality_inspection_date', 'customs_declaration_ref',
  'insurance_policy_number', 'carbon_footprint_kg', 'recycling_category_code',
  'last_inventory_check', 'shelf_position_aisle', 'shelf_position_row',
  'shelf_position_column', 'weight_grams', 'weight_ounces', 'dimensions_length_cm',
  'dimensions_width_cm', 'dimensions_height_cm', 'packaging_type', 'packaging_weight_grams',
  'country_of_origin', 'manufacturing_date', 'expiry_date', 'batch_number',
  'serial_number', 'ean_barcode', 'upc_barcode', 'isbn_code', 'asin_code',
  'harmonized_system_code', 'tax_category', 'vat_rate_percent', 'duty_rate_percent',
  'minimum_order_quantity', 'maximum_order_quantity', 'reorder_point',
  'reorder_quantity', 'lead_time_days', 'safety_stock_units', 'abc_classification',
  'demand_forecast_next_month', 'demand_forecast_next_quarter', 'seasonal_index',
  'price_elasticity_coefficient', 'competitor_price_avg', 'competitor_price_min',
  'competitor_price_max', 'price_last_updated', 'price_history_30d',
  'margin_percentage', 'cost_of_goods_sold', 'shipping_cost_domestic',
  'shipping_cost_international', 'shipping_weight_volumetric', 'shipping_class',
  'fragile_flag', 'hazmat_flag', 'hazmat_class', 'lithium_battery_flag',
  'oversized_flag', 'temperature_sensitive_flag', 'min_storage_temp_celsius',
  'max_storage_temp_celsius', 'humidity_requirements', 'light_sensitivity',
  'stackable_flag', 'max_stack_height', 'pallet_quantity', 'container_20ft_quantity',
  'container_40ft_quantity', 'supplier_id', 'supplier_name', 'supplier_email',
  'supplier_phone', 'supplier_address_line1', 'supplier_address_line2',
  'supplier_city', 'supplier_state', 'supplier_country', 'supplier_postal_code',
  'supplier_rating', 'supplier_lead_time_avg', 'supplier_defect_rate',
  'last_supplier_audit_date', 'alternative_supplier_id', 'brand_id',
  'brand_name', 'brand_tier', 'product_line', 'product_family',
  'product_group', 'product_subgroup', 'lifecycle_stage', 'launch_date',
  'discontinuation_date', 'replacement_product_id', 'canonical_url',
  'seo_title', 'seo_description', 'seo_keywords', 'og_image_url',
  'schema_markup_type', 'analytics_category', 'analytics_subcategory',
  'analytics_label', 'ga4_item_id', 'facebook_pixel_content_id',
  'tiktok_pixel_content_id', 'pinterest_product_pin_id', 'affiliate_commission_rate',
  'affiliate_cookie_days', 'loyalty_points_earned', 'loyalty_tier_multiplier',
  'gift_wrapping_available', 'gift_message_available', 'personalization_available',
  'personalization_options_json', 'assembly_required', 'assembly_time_minutes',
  'warranty_months', 'warranty_type', 'return_policy_days', 'return_restocking_fee',
  'customer_support_tier', 'avg_resolution_time_hours', 'total_units_sold',
  'total_revenue_generated', 'avg_daily_views', 'conversion_rate_percent',
  'cart_abandonment_rate', 'wishlist_count', 'comparison_count',
  'social_shares_count', 'user_generated_content_count', 'influencer_mentions',
  'press_mentions', 'awards_received', 'certification_ids', 'compliance_standards',
  'accessibility_notes', 'age_restriction', 'gender_target', 'internal_notes',
  'created_by_user_id', 'updated_by_user_id', 'approved_by_user_id',
  'created_at', 'updated_at', 'approved_at', 'published_at',
  'last_synced_at', 'sync_source', 'sync_status', 'etag_hash',
]

function generateExtraFields(seed: number): Record<string, string | number | boolean> {
  const extra: Record<string, string | number | boolean> = {}
  for (let i = 0; i < EXTRA_FIELDS_COUNT; i++) {
    const fieldName = extraFieldNames[i] || `metadata_field_${String(i).padStart(3, '0')}`
    // Generate deterministic but varied values
    const val = (seed * 31 + i * 17) % 1000
    if (i % 3 === 0) {
      extra[fieldName] = `value_${val}_${fieldName}_${seed}_padding_${'x'.repeat(50)}`
    } else if (i % 3 === 1) {
      extra[fieldName] = val + seed * 0.01
    } else {
      extra[fieldName] = val % 2 === 0
    }
  }
  return extra
}

// Pre-generate the full payload at startup
const baseProducts = productsData.products
const allProducts = Array.from({ length: TOTAL_PRODUCTS }, (_, i) => {
  const base = baseProducts[i % baseProducts.length]
  return {
    ...base,
    id: `${base.id}-${i}`,
    ...generateExtraFields(i),
  }
})

export default defineEventHandler(() => {
  return allProducts
})
