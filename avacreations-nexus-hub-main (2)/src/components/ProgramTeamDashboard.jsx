
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MapPin, 
  FileText,
  Download,
  Upload,
  LogOut,
  Building2,
  IndianRupee,
  Package
} from 'lucide-react';

const ProgramTeamDashboard = ({ onLogout }) => {
  const [clusterData] = useState([
    {
      name: 'Guwahati North',
      leader: 'Priya Sharma',
      artisans: 24,
      thisMonth: { units: 680, efficiency: 92, revenue: 95200 },
      status: 'excellent'
    },
    {
      name: 'Dibrugarh East',
      leader: 'Kamala Borah',
      artisans: 18,
      thisMonth: { units: 520, efficiency: 88, revenue: 72800 },
      status: 'good'
    },
    {
      name: 'Silchar Central',
      leader: 'Meera Devi',
      artisans: 31,
      thisMonth: { units: 890, efficiency: 95, revenue: 124600 },
      status: 'excellent'
    },
    {
      name: 'Tezpur Valley',
      leader: 'Sunita Das',
      artisans: 15,
      thisMonth: { units: 380, efficiency: 78, revenue: 53200 },
      status: 'needs-attention'
    }
  ]);

  const [schemes] = useState([
    {
      name: 'PM MUDRA Yojana',
      category: 'Credit Support',
      eligibility: 'All registered artisans',
      deadline: '2024-02-15',
      status: 'active'
    },
    {
      name: 'Handloom Weavers Comprehensive Welfare Scheme',
      category: 'Skill Development',
      eligibility: 'Certified weavers',
      deadline: '2024-01-30',
      status: 'closing-soon'
    },
    {
      name: 'Stand Up India',
      category: 'Entrepreneurship',
      eligibility: 'Women entrepreneurs',
      deadline: '2024-03-01',
      status: 'active'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'needs-attention': return 'bg-yellow-100 text-yellow-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'closing-soon': return 'bg-red-100 text-red-800';
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
              <Building2 className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Program Overview</h1>
                <p className="text-sm text-gray-500">Central Management Dashboard</p>
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
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Clusters</p>
                  <p className="text-3xl font-bold text-purple-600">12</p>
                </div>
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Artisans</p>
                  <p className="text-3xl font-bold text-blue-600">288</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Monthly Production</p>
                  <p className="text-3xl font-bold text-green-600">2,470</p>
                </div>
                <Package className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-orange-600">₹3.45L</p>
                </div>
                <IndianRupee className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="clusters" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="clusters">Cluster Performance</TabsTrigger>
            <TabsTrigger value="schemes">Government Schemes</TabsTrigger>
            <TabsTrigger value="reports">Analytics & Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="clusters" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Cluster Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clusterData.map((cluster, idx) => (
                    <div key={idx} className="p-4 border rounded-lg bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{cluster.name}</h4>
                          <p className="text-sm text-gray-600">
                            Led by {cluster.leader} • {cluster.artisans} artisans
                          </p>
                        </div>
                        <Badge className={getStatusColor(cluster.status)}>
                          {cluster.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-gray-600">Units This Month</p>
                          <p className="text-xl font-bold text-green-600">{cluster.thisMonth.units}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-gray-600">Efficiency</p>
                          <p className="text-xl font-bold text-blue-600">{cluster.thisMonth.efficiency}%</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-gray-600">Revenue</p>
                          <p className="text-xl font-bold text-purple-600">₹{(cluster.thisMonth.revenue / 1000).toFixed(0)}K</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schemes" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Available Schemes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {schemes.map((scheme, idx) => (
                      <div key={idx} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-sm">{scheme.name}</h4>
                          <Badge className={getStatusColor(scheme.status)}>
                            {scheme.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{scheme.category}</p>
                        <p className="text-xs text-gray-500 mb-2">{scheme.eligibility}</p>
                        <p className="text-xs font-medium">Deadline: {scheme.deadline}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Scheme Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Add New Scheme
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    View Applications
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Scheme Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Program Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Overall Efficiency</span>
                        <span className="font-semibold">89%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Production Target</span>
                        <span className="font-semibold">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Revenue Goal</span>
                        <span className="font-semibold">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Export Reports
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Monthly Production Report
                  </Button>
                  <Button className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Artisan Performance Data
                  </Button>
                  <Button className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Financial Summary
                  </Button>
                  <Button className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Scheme Utilization Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProgramTeamDashboard;
