-- ============================================
-- LOUKII ADVISOR PROFILE SYSTEM - DATABASE SCHEMA
-- ============================================

-- Countries Table
CREATE TABLE IF NOT EXISTS countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  code VARCHAR(3) NOT NULL UNIQUE, -- ISO 3166-1 alpha-2
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- States/Regions Table
CREATE TABLE IF NOT EXISTS states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(country_id, name)
);

-- Service Categories Table
CREATE TABLE IF NOT EXISTS service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  icon VARCHAR(50), -- lucide-react icon name
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Brands/Companies Table
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  logo_url TEXT,
  website VARCHAR(500),
  is_approved BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- NULL if system-created
  approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for brand approval queries
CREATE INDEX idx_brands_approval ON brands(is_approved, is_active);
CREATE INDEX idx_brands_created_by ON brands(created_by);

-- Advisor Profiles Table (extends auth.users)
CREATE TABLE IF NOT EXISTS advisor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Personal Information
  full_name VARCHAR(200) NOT NULL,
  profile_photo_url TEXT,
  whatsapp_number VARCHAR(20),
  call_number VARCHAR(20),
  country_id UUID REFERENCES countries(id) ON DELETE SET NULL,
  state_id UUID REFERENCES states(id) ON DELETE SET NULL,
  
  -- Social Media Links
  facebook_url VARCHAR(500),
  instagram_url VARCHAR(500),
  linkedin_url VARCHAR(500),
  twitter_url VARCHAR(500),
  website_url VARCHAR(500),
  
  -- Professional Details
  short_summary TEXT, -- max 20 words
  service_category_id UUID REFERENCES service_categories(id) ON DELETE SET NULL,
  years_of_experience VARCHAR(50),
  license_number VARCHAR(100),
  
  -- Profile Status
  is_complete BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  profile_completion_percentage INTEGER DEFAULT 0,
  
  -- Terms & Conditions
  terms_accepted BOOLEAN DEFAULT false,
  terms_accepted_at TIMESTAMP WITH TIME ZONE,
  terms_version VARCHAR(20),
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for common queries
CREATE INDEX idx_advisor_profiles_user ON advisor_profiles(user_id);
CREATE INDEX idx_advisor_profiles_category ON advisor_profiles(service_category_id);
CREATE INDEX idx_advisor_profiles_published ON advisor_profiles(is_published, is_complete);
CREATE INDEX idx_advisor_profiles_country ON advisor_profiles(country_id);
CREATE INDEX idx_advisor_profiles_state ON advisor_profiles(state_id);

-- Profile Posters/Slides Table
CREATE TABLE IF NOT EXISTS profile_posters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advisor_profile_id UUID NOT NULL REFERENCES advisor_profiles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_profile_posters_advisor ON profile_posters(advisor_profile_id);

-- Junction Table: Advisor Brands (Many-to-Many)
CREATE TABLE IF NOT EXISTS advisor_brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advisor_profile_id UUID NOT NULL REFERENCES advisor_profiles(id) ON DELETE CASCADE,
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(advisor_profile_id, brand_id)
);

CREATE INDEX idx_advisor_brands_advisor ON advisor_brands(advisor_profile_id);
CREATE INDEX idx_advisor_brands_brand ON advisor_brands(brand_id);

-- Profile Bio Rows Table (for custom bio builder)
CREATE TABLE IF NOT EXISTS profile_bio_rows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advisor_profile_id UUID NOT NULL REFERENCES advisor_profiles(id) ON DELETE CASCADE,
  columns_count INTEGER NOT NULL DEFAULT 1 CHECK (columns_count BETWEEN 1 AND 3),
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_profile_bio_rows_advisor ON profile_bio_rows(advisor_profile_id);

-- Profile Bio Widgets Table (for custom bio builder)
CREATE TABLE IF NOT EXISTS profile_bio_widgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  row_id UUID NOT NULL REFERENCES profile_bio_rows(id) ON DELETE CASCADE,
  column_index INTEGER NOT NULL DEFAULT 0,
  widget_type VARCHAR(50) NOT NULL, -- 'heading', 'text', 'image', 'video'
  content JSONB NOT NULL, -- Flexible content storage
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_profile_bio_widgets_row ON profile_bio_widgets(row_id);

-- ============================================
-- SAMPLE DATA FOR TESTING
-- ============================================

-- Insert Sample Countries
INSERT INTO countries (name, code) VALUES
  ('Malaysia', 'MY'),
  ('Singapore', 'SG'),
  ('Indonesia', 'ID'),
  ('Thailand', 'TH'),
  ('Philippines', 'PH')
ON CONFLICT (code) DO NOTHING;

-- Insert Sample States for Malaysia
INSERT INTO states (country_id, name, code) 
SELECT id, 'Johor', 'JHR' FROM countries WHERE code = 'MY'
UNION ALL
SELECT id, 'Kedah', 'KDH' FROM countries WHERE code = 'MY'
UNION ALL
SELECT id, 'Kelantan', 'KTN' FROM countries WHERE code = 'MY'
UNION ALL
SELECT id, 'Kuala Lumpur', 'KUL' FROM countries WHERE code = 'MY'
UNION ALL
SELECT id, 'Melaka', 'MLK' FROM countries WHERE code = 'MY'
UNION ALL
SELECT id, 'Negeri Sembilan', 'NSN' FROM countries WHERE code = 'MY'
UNION ALL
SELECT id, 'Pahang', 'PHG' FROM countries WHERE code = 'MY'
UNION ALL
SELECT id, 'Penang', 'PNG' FROM countries WHERE code = 'MY'
UNION ALL
SELECT id, 'Perak', 'PRK' FROM countries WHERE code = 'MY'
UNION ALL
SELECT id, 'Perlis', 'PLS' FROM countries WHERE code = 'MY'
UNION ALL
SELECT id, 'Sabah', 'SBH' FROM countries WHERE code = 'MY'
UNION ALL
SELECT id, 'Sarawak', 'SWK' FROM countries WHERE code = 'MY'
UNION ALL
SELECT id, 'Selangor', 'SGR' FROM countries WHERE code = 'MY'
UNION ALL
SELECT id, 'Terengganu', 'TRG' FROM countries WHERE code = 'MY'
ON CONFLICT (country_id, name) DO NOTHING;

-- Insert Sample Service Categories
INSERT INTO service_categories (name, slug, icon, description, display_order) VALUES
  ('Property & Real Estate', 'property-real-estate', 'Building2', 'Real estate agents and property consultants', 1),
  ('Insurance & Takaful', 'insurance-takaful', 'Shield', 'Insurance and takaful advisors', 2),
  ('Financial Planning', 'financial-planning', 'TrendingUp', 'Financial planners and wealth advisors', 3),
  ('Investment Advisory', 'investment-advisory', 'LineChart', 'Investment consultants and advisors', 4),
  ('Tax Consultation', 'tax-consultation', 'Calculator', 'Tax advisors and consultants', 5),
  ('Business Consulting', 'business-consulting', 'Briefcase', 'Business strategy and management consultants', 6),
  ('Legal Services', 'legal-services', 'Scale', 'Legal advisors and consultants', 7),
  ('Education Consulting', 'education-consulting', 'GraduationCap', 'Education and career advisors', 8)
ON CONFLICT (slug) DO NOTHING;

-- Insert Sample Brands (Pre-approved)
INSERT INTO brands (name, slug, is_approved, approved_at) VALUES
  ('IQI Realty', 'iqi-realty', true, NOW()),
  ('Hartamas', 'hartamas', true, NOW()),
  ('GS Realty', 'gs-realty', true, NOW()),
  ('PropNex', 'propnex', true, NOW()),
  ('Chester', 'chester', true, NOW()),
  ('Developer Rep', 'developer-rep', true, NOW()),
  ('RoadField', 'roadfield', true, NOW()),
  ('Mauzan', 'mauzan', true, NOW()),
  ('REN Certified', 'ren-certified', true, NOW()),
  ('Prudential', 'prudential', true, NOW()),
  ('Great Eastern', 'great-eastern', true, NOW()),
  ('AIA', 'aia', true, NOW()),
  ('Manulife', 'manulife', true, NOW()),
  ('Allianz', 'allianz', true, NOW())
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE advisor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_posters ENABLE ROW LEVEL SECURITY;
ALTER TABLE advisor_brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_bio_rows ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_bio_widgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

-- Advisor Profiles Policies
CREATE POLICY "Users can view published profiles"
  ON advisor_profiles FOR SELECT
  USING (is_published = true OR auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON advisor_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON advisor_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Profile Posters Policies
CREATE POLICY "Users can manage their own posters"
  ON profile_posters FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM advisor_profiles
      WHERE advisor_profiles.id = profile_posters.advisor_profile_id
      AND advisor_profiles.user_id = auth.uid()
    )
  );

-- Advisor Brands Policies
CREATE POLICY "Users can manage their own brands"
  ON advisor_brands FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM advisor_profiles
      WHERE advisor_profiles.id = advisor_brands.advisor_profile_id
      AND advisor_profiles.user_id = auth.uid()
    )
  );

-- Profile Bio Rows Policies
CREATE POLICY "Users can manage their own bio rows"
  ON profile_bio_rows FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM advisor_profiles
      WHERE advisor_profiles.id = profile_bio_rows.advisor_profile_id
      AND advisor_profiles.user_id = auth.uid()
    )
  );

-- Profile Bio Widgets Policies
CREATE POLICY "Users can manage their own bio widgets"
  ON profile_bio_widgets FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profile_bio_rows
      JOIN advisor_profiles ON advisor_profiles.id = profile_bio_rows.advisor_profile_id
      WHERE profile_bio_rows.id = profile_bio_widgets.row_id
      AND advisor_profiles.user_id = auth.uid()
    )
  );

-- Brands Policies
CREATE POLICY "Anyone can view approved brands"
  ON brands FOR SELECT
  USING (is_approved = true AND is_active = true);

CREATE POLICY "Users can view their own custom brands"
  ON brands FOR SELECT
  USING (created_by = auth.uid());

CREATE POLICY "Users can create custom brands"
  ON brands FOR INSERT
  WITH CHECK (created_by = auth.uid() AND is_approved = false);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_advisor_profiles_updated_at
  BEFORE UPDATE ON advisor_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profile_bio_rows_updated_at
  BEFORE UPDATE ON profile_bio_rows
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profile_bio_widgets_updated_at
  BEFORE UPDATE ON profile_bio_widgets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate profile completion percentage
CREATE OR REPLACE FUNCTION calculate_profile_completion(profile_id UUID)
RETURNS INTEGER AS $$
DECLARE
  completion INTEGER := 0;
  profile_record RECORD;
BEGIN
  SELECT * INTO profile_record FROM advisor_profiles WHERE id = profile_id;
  
  IF profile_record.full_name IS NOT NULL THEN completion := completion + 10; END IF;
  IF profile_record.profile_photo_url IS NOT NULL THEN completion := completion + 10; END IF;
  IF profile_record.whatsapp_number IS NOT NULL THEN completion := completion + 5; END IF;
  IF profile_record.country_id IS NOT NULL THEN completion := completion + 5; END IF;
  IF profile_record.state_id IS NOT NULL THEN completion := completion + 5; END IF;
  IF profile_record.short_summary IS NOT NULL THEN completion := completion + 10; END IF;
  IF profile_record.service_category_id IS NOT NULL THEN completion := completion + 15; END IF;
  IF profile_record.years_of_experience IS NOT NULL THEN completion := completion + 5; END IF;
  IF profile_record.license_number IS NOT NULL THEN completion := completion + 5; END IF;
  
  -- Check if has at least one brand
  IF EXISTS (SELECT 1 FROM advisor_brands WHERE advisor_profile_id = profile_id) THEN
    completion := completion + 10;
  END IF;
  
  -- Check if has at least one poster
  IF EXISTS (SELECT 1 FROM profile_posters WHERE advisor_profile_id = profile_id) THEN
    completion := completion + 10;
  END IF;
  
  -- Check if has bio content
  IF EXISTS (SELECT 1 FROM profile_bio_rows WHERE advisor_profile_id = profile_id) THEN
    completion := completion + 10;
  END IF;
  
  RETURN completion;
END;
$$ LANGUAGE plpgsql;
