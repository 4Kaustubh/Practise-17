
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Package, 
  AlertTriangle, 
  CheckCircle, 
  BarChart3,
  Camera,
  FileText,
  LogOut,
  TrendingUp,
  Boxes,
  IndianRupee
} from 'lucide-react';

const ClusterLeaderDashboard = ({ onLogout }) => {
  const [artisanData] = useState([
    { 
      name: 'Meera Devi', 
      id: 'ART001',
      thisWeek: { units: 45, hours: 32, efficiency: 92 },
      status: 'active',
      pendingApprovals: 2
    },
    { 
      name: 'Kamala Borah', 
      id: 'ART002',
      thisWeek: { units: 38, hours: 28, efficiency: 88 },
      status: 'active',
      pendingApprovals: 1
    },
    { 
      name: 'Sunita Sharma', 
      id: 'ART003',
      thisWeek: { units: 52, hours: 35, efficiency: 95 },
      status: 'active',
      pendingApprovals: 0
    },
    { 
      name: 'Ruma Das', 
      id: 'ART004',
      thisWeek: { units: 28, hours: 25, efficiency: 75 },
      status: 'needs-attention',
      pendingApprovals: 3
    }
  ]);

  const [inventoryData] = useState([
    { item: 'Silk Yarn', current: 45, required: 60, unit: 'kg', status: 'low' },
    { item: 'Cotton Thread', current: 120, required: 100, unit: 'kg', status: 'good' },
    { item: 'Natural Dyes', current: 25, required: 30, unit: 'liters', status: 'low' },
    { item: 'Looms', current: 12, required: 15, unit: 'pieces', status: 'critical' }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Cluster Management</h1>
                <p className="text-sm text-gray-500">AVA Sakhi Dashboard</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout} size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Artisans</p>
                  <p className="text-3xl font-bold text-blue-600">24</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Units This Week</p>
                  <p className="text-3xl font-bold text-green-600">163</p>
                </div>
                <Package className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Approvals</p>
                  <p className="text-3xl font-bold text-orange-600">6</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Efficiency</p>
                  <p className="text-3xl font-bold text-purple-600">88%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="artisans" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="artisans">Artisan Overview</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="artisans" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Artisan Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {artisanData.map((artisan, idx) => (
                    <div key={idx} className="p-4 border rounded-lg bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{artisan.name}</h4>
                          <p className="text-sm text-gray-600">{artisan.id}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {artisan.pendingApprovals > 0 && (
                            <Badge variant="secondary">
                              {artisan.pendingApprovals} pending
                            </Badge>
                          )}
                          <Badge variant={artisan.status === 'active' ? 'default' : 'destructive'}>
                            {artisan.status === 'active' ? 'Active' : 'Needs Attention'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Units</p>
                          <p className="font-semibold">{artisan.thisWeek.units}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Hours</p>
                          <p className="font-semibold">{artisan.thisWeek.hours}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Efficiency</p>
                          <div className="flex items-center gap-2">
                            <Progress value={artisan.thisWeek.efficiency} className="flex-1" />
                            <span className="font-semibold">{artisan.thisWeek.efficiency}%</span>
                          </div>
                        </div>
                      </div>

                      {artisan.pendingApprovals > 0 && (
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" variant="outline">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Review Entries
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Boxes className="w-5 h-5" />
                    Material Inventory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {inventoryData.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.item}</h4>
                          <p className="text-sm text-gray-600">
                            {item.current} / {item.required} {item.unit}
                          </p>
                          <div className="mt-2">
                            <Progress 
                              value={(item.current / item.required) * 100} 
                              className="h-2"
                            />
                          </div>
                        </div>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Field Reports
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    Report Mulberry Disease
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Equipment Issues
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Quality Concerns
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Production Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>This Week</span>
                      <span className="font-semibold">163 units</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Last Week</span>
                      <span className="font-semibold">142 units</span>
                    </div>
                    <div className="flex justify-between items-center text-green-600">
                      <span>Growth</span>
                      <span className="font-semibold">+14.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IndianRupee className="w-5 h-5" />
                    Payment Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Pending Payments</span>
                      <span className="font-semibold text-orange-600">₹24,500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Processed This Week</span>
                      <span className="font-semibold text-green-600">₹18,200</span>
                    </div>
                    <Button className="w-full">Generate Payment Report</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClusterLeaderDashboard;
