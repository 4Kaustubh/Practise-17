
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Palette, BarChart3, Phone, LogIn } from 'lucide-react';
import ArtisanDashboard from '@/components/ArtisanDashboard';
import ClusterLeaderDashboard from '@/components/ClusterLeaderDashboard';
import ProgramTeamDashboard from '@/components/ProgramTeamDashboard';

type UserRole = 'artisan' | 'cluster-leader' | 'program-team' | null;

const Index = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // In a real app, this would handle Firebase Auth with OTP
    if (phoneNumber && currentRole) {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentRole(null);
    setPhoneNumber('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-800">AVACreations</CardTitle>
            <p className="text-gray-600">Empowering Artisans, Building Communities</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Select Your Role</Label>
              <Select value={currentRole || ''} onValueChange={(value) => setCurrentRole(value as UserRole)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="artisan">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Artisan
                    </div>
                  </SelectItem>
                  <SelectItem value="cluster-leader">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Cluster Leader (AVA Sakhi)
                    </div>
                  </SelectItem>
                  <SelectItem value="program-team">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Program Team
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleLogin} 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={!phoneNumber || !currentRole}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login with OTP
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (currentRole) {
      case 'artisan':
        return <ArtisanDashboard onLogout={handleLogout} />;
      case 'cluster-leader':
        return <ClusterLeaderDashboard onLogout={handleLogout} />;
      case 'program-team':
        return <ProgramTeamDashboard onLogout={handleLogout} />;
      default:
        return null;
    }
  };

  return renderDashboard();
};

export default Index;
