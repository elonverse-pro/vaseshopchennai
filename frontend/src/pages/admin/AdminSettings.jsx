import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { siteSettings as initialSettings } from '../../mockData';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Switch } from '../../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { toast } from '../../hooks/use-toast';
import { Save, Globe, Phone, Share2, Palette, Image as ImageIcon } from 'lucide-react';

const AdminSettings = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState('general');

  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = () => {
    // In real implementation, this would save to backend
    toast({ title: 'Settings saved successfully!', description: 'Your changes have been applied.' });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Settings</h2>
            <p className="text-gray-600 mt-1">Manage your website settings and configuration</p>
          </div>
          <Button onClick={handleSave} className="bg-[#d4af37] hover:bg-[#c4a030] text-black">
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Social</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Media</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Site Information</CardTitle>
                <CardDescription>Basic information about your website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Site Name</Label>
                  <Input
                    value={settings.siteName}
                    onChange={(e) => handleChange('siteName', e.target.value)}
                    placeholder="Vape Shop Chennai"
                  />
                </div>
                <div>
                  <Label>Site Tagline</Label>
                  <Textarea
                    value={settings.siteTagline}
                    onChange={(e) => handleChange('siteTagline', e.target.value)}
                    placeholder="Your tagline here"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Bar Settings</CardTitle>
                <CardDescription>Configure the top announcement bar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Top Bar</Label>
                    <p className="text-sm text-gray-500">Show announcement bar at the top</p>
                  </div>
                  <Switch
                    checked={settings.topBarEnabled}
                    onCheckedChange={(checked) => handleChange('topBarEnabled', checked)}
                  />
                </div>
                {settings.topBarEnabled && (
                  <>
                    <div>
                      <Label>Top Bar Message</Label>
                      <Input
                        value={settings.topBarMessage}
                        onChange={(e) => handleChange('topBarMessage', e.target.value)}
                        placeholder="WhatsApp Order is Accepted - 7877475920"
                      />
                    </div>
                    <div>
                      <Label>Top Bar Background Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={settings.topBarBackgroundColor}
                          onChange={(e) => handleChange('topBarBackgroundColor', e.target.value)}
                          className="w-20 h-10"
                        />
                        <Input
                          value={settings.topBarBackgroundColor}
                          onChange={(e) => handleChange('topBarBackgroundColor', e.target.value)}
                          placeholder="#2d2d2d"
                        />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
                <CardDescription>Enable or disable website features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>WhatsApp Button</Label>
                    <p className="text-sm text-gray-500">Show floating WhatsApp button</p>
                  </div>
                  <Switch
                    checked={settings.showWhatsAppButton}
                    onCheckedChange={(checked) => handleChange('showWhatsAppButton', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Call Button</Label>
                    <p className="text-sm text-gray-500">Show call button</p>
                  </div>
                  <Switch
                    checked={settings.showCallButton}
                    onCheckedChange={(checked) => handleChange('showCallButton', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Search Feature</Label>
                    <p className="text-sm text-gray-500">Enable search functionality</p>
                  </div>
                  <Switch
                    checked={settings.enableSearch}
                    onCheckedChange={(checked) => handleChange('enableSearch', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Settings */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Manage your contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>WhatsApp Number (with country code)</Label>
                  <Input
                    value={settings.whatsappNumber}
                    onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                    placeholder="917877475920"
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: Country code + number (e.g., 917877475920)</p>
                </div>
                <div>
                  <Label>Primary Phone Number</Label>
                  <Input
                    value={settings.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="7877475920"
                  />
                </div>
                <div>
                  <Label>Alternate Phone Number (Optional)</Label>
                  <Input
                    value={settings.alternatePhone}
                    onChange={(e) => handleChange('alternatePhone', e.target.value)}
                    placeholder="9876543210"
                  />
                </div>
                <div>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="info@vapeshopschennai.shop"
                  />
                </div>
                <div>
                  <Label>Address</Label>
                  <Textarea
                    value={settings.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="Chennai, Tamil Nadu"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Media Settings */}
          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
                <CardDescription>Add your social media profiles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Facebook URL</Label>
                  <Input
                    value={settings.facebookUrl}
                    onChange={(e) => handleChange('facebookUrl', e.target.value)}
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
                <div>
                  <Label>Instagram URL</Label>
                  <Input
                    value={settings.instagramUrl}
                    onChange={(e) => handleChange('instagramUrl', e.target.value)}
                    placeholder="https://instagram.com/yourpage"
                  />
                </div>
                <div>
                  <Label>Twitter URL</Label>
                  <Input
                    value={settings.twitterUrl}
                    onChange={(e) => handleChange('twitterUrl', e.target.value)}
                    placeholder="https://twitter.com/yourpage"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Customize your homepage hero section</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Hero Title (First Line)</Label>
                  <Input
                    value={settings.heroTitle}
                    onChange={(e) => handleChange('heroTitle', e.target.value)}
                    placeholder="VAPE SHOP"
                  />
                </div>
                <div>
                  <Label>Hero Subtitle (Second Line - Golden Text)</Label>
                  <Input
                    value={settings.heroSubtitle}
                    onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                    placeholder="CHENNAI"
                  />
                </div>
                <div>
                  <Label>Hero Tagline</Label>
                  <Input
                    value={settings.heroTagline}
                    onChange={(e) => handleChange('heroTagline', e.target.value)}
                    placeholder="PREMIUM VAPES. AUTHENTIC EXPERIENCE."
                  />
                </div>
                <div>
                  <Label>Hero Description</Label>
                  <Textarea
                    value={settings.heroDescription}
                    onChange={(e) => handleChange('heroDescription', e.target.value)}
                    placeholder="Your description here"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Hero Button Text</Label>
                  <Input
                    value={settings.heroButtonText}
                    onChange={(e) => handleChange('heroButtonText', e.target.value)}
                    placeholder="Shop Now"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Theme Colors</CardTitle>
                <CardDescription>Customize your brand colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Primary Color (Golden Accent)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => handleChange('primaryColor', e.target.value)}
                      className="w-20 h-10"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => handleChange('primaryColor', e.target.value)}
                      placeholder="#d4af37"
                    />
                  </div>
                </div>
                <div>
                  <Label>Secondary Color (WhatsApp Green)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => handleChange('secondaryColor', e.target.value)}
                      className="w-20 h-10"
                    />
                    <Input
                      value={settings.secondaryColor}
                      onChange={(e) => handleChange('secondaryColor', e.target.value)}
                      placeholder="#25D366"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Settings */}
          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Images & Media</CardTitle>
                <CardDescription>Manage your website images</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Hero Background Image URL</Label>
                  <Input
                    value={settings.heroBackgroundImage}
                    onChange={(e) => handleChange('heroBackgroundImage', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  {settings.heroBackgroundImage && (
                    <div className="mt-2">
                      <img
                        src={settings.heroBackgroundImage}
                        alt="Hero background preview"
                        className="w-full h-40 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <Label>Logo URL (Optional)</Label>
                  <Input
                    value={settings.logoUrl}
                    onChange={(e) => handleChange('logoUrl', e.target.value)}
                    placeholder="https://example.com/logo.png"
                  />
                  {settings.logoUrl && (
                    <div className="mt-2">
                      <img
                        src={settings.logoUrl}
                        alt="Logo preview"
                        className="h-16 object-contain rounded border bg-white p-2"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <Label>Favicon URL (Optional)</Label>
                  <Input
                    value={settings.faviconUrl}
                    onChange={(e) => handleChange('faviconUrl', e.target.value)}
                    placeholder="https://example.com/favicon.ico"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;