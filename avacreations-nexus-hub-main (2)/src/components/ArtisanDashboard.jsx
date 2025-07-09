
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Clock, 
  Upload, 
  IndianRupee, 
  FileText, 
  Mic,
  LogOut,
  Plus,
  Calendar
} from 'lucide-react';

const ArtisanDashboard = ({ onLogout }) => {
  const [productionData, setProductionData] = useState({
    units: '',
    hours: '',
    materials: '',
    notes: ''
  });

  const [recentEntries] = useState([
    { date: '2024-01-08', units: '12', hours: '8', materials: 'Silk yarn - 2kg', status: 'approved' },
    { date: '2024-01-07', units: '10', hours: '7', materials: 'Cotton - 1.5kg', status: 'pending' },
    { date: '2024-01-06', units: '15', hours: '9', materials: 'Silk yarn - 3kg', status: 'approved' }
  ]);

  const [payments] = useState([
    { date: '2024-01-05', amount: 2400, type: 'production', status: 'paid' },
    { date: '2024-01-01', amount: 1800, type: 'bonus', status: 'pending' }
  ]);

  const handleSubmitProduction = () => {
    // In real app, this would sync to Firebase/Supabase
    console.log('Production logged:', productionData);
    setProductionData({ units: '', hours: '', materials: '', notes: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">My Workspace</h1>
                <p className="text-sm text-gray-500">Artisan Dashboard</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Production Logging */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Log Today's Production
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="units">Units Produced</Label>
                    <Input
                      id="units"
                      type="number"
                      placeholder="e.g., 12"
                      value={productionData.units}
                      onChange={(e) => setProductionData({...productionData, units: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hours">Hours Worked</Label>
                    <Input
                      id="hours"
                      type="number"
                      placeholder="e.g., 8"
                      value={productionData.hours}
                      onChange={(e) => setProductionData({...productionData, hours: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="materials">Materials Used</Label>
                  <Input
                    id="materials"
                    placeholder="e.g., Silk yarn - 2kg, Natural dyes"
                    value={productionData.materials}
                    onChange={(e) => setProductionData({...productionData, materials: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Hindi/Assamese)</Label>
                  <div className="relative">
                    <Textarea
                      id="notes"
                      placeholder="Any additional notes or issues..."
                      value={productionData.notes}
                      onChange={(e) => setProductionData({...productionData, notes: e.target.value})}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                    >
                      <Mic className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={handleSubmitProduction}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!productionData.units || !productionData.hours}
                >
                  <Package className="w-4 h-4 mr-2" />
                  Submit Production Log
                </Button>
              </CardContent>
            </Card>

            {/* Recent Entries */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Recent Entries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentEntries.map((entry, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-medium">{entry.date}</span>
                          <span>{entry.units} units</span>
                          <span>{entry.hours}h</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{entry.materials}</p>
                      </div>
                      <Badge variant={entry.status === 'approved' ? 'default' : 'secondary'}>
                        {entry.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Units</span>
                  </div>
                  <span className="font-semibold">37</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Hours</span>
                  </div>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">Earnings</span>
                  </div>
                  <span className="font-semibold">₹4,200</span>
                </div>
              </CardContent>
            </Card>

            {/* Document Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Upload className="w-5 h-5" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Upload ID Proof
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Scheme Forms
                </Button>
              </CardContent>
            </Card>

            {/* Payment Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <IndianRupee className="w-5 h-5" />
                  Payments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {payments.map((payment, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <p className="text-sm font-medium">₹{payment.amount}</p>
                      <p className="text-xs text-gray-600">{payment.date}</p>
                    </div>
                    <Badge variant={payment.status === 'paid' ? 'default' : 'secondary'}>
                      {payment.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanDashboard;
