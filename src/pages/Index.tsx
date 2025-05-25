
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TrafficMap from '@/components/TrafficMap';
import TrafficSignals from '@/components/TrafficSignals';
import EmergencyVehicles from '@/components/EmergencyVehicles';
import AutonomousVehicles from '@/components/AutonomousVehicles';
import IoTSensors from '@/components/IoTSensors';
import Analytics from '@/components/Analytics';
import { AlertTriangle, Activity, Car, Radio, MapPin, Zap } from 'lucide-react';

const Index = () => {
  const [systemStatus, setSystemStatus] = useState('operational');
  const [activeEmergencies, setActiveEmergencies] = useState(2);
  const [connectedVehicles, setConnectedVehicles] = useState(1247);
  const [avgSpeed, setAvgSpeed] = useState(35.2);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setConnectedVehicles(prev => prev + Math.floor(Math.random() * 10) - 5);
      setAvgSpeed(prev => Math.max(15, Math.min(65, prev + (Math.random() - 0.5) * 2)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Radio className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Intelligent Traffic Management
                </h1>
                <p className="text-slate-400 text-sm">Smart City Control Center</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge 
                variant={systemStatus === 'operational' ? 'default' : 'destructive'}
                className={systemStatus === 'operational' ? 'bg-green-500 hover:bg-green-600' : ''}
              >
                <Activity className="w-3 h-3 mr-1" />
                {systemStatus === 'operational' ? 'System Online' : 'System Alert'}
              </Badge>
              
              {activeEmergencies > 0 && (
                <Badge variant="destructive" className="animate-pulse">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {activeEmergencies} Active Emergencies
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <div className="container mx-auto px-6 py-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Connected Vehicles</p>
                  <p className="text-2xl font-bold text-blue-400">{connectedVehicles.toLocaleString()}</p>
                </div>
                <Car className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Average Speed</p>
                  <p className="text-2xl font-bold text-green-400">{avgSpeed.toFixed(1)} mph</p>
                </div>
                <Activity className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Signals</p>
                  <p className="text-2xl font-bold text-yellow-400">847</p>
                </div>
                <Zap className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">IoT Sensors</p>
                  <p className="text-2xl font-bold text-purple-400">2,156</p>
                </div>
                <MapPin className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">Overview</TabsTrigger>
            <TabsTrigger value="signals" className="data-[state=active]:bg-blue-600">Traffic Signals</TabsTrigger>
            <TabsTrigger value="emergency" className="data-[state=active]:bg-blue-600">Emergency</TabsTrigger>
            <TabsTrigger value="autonomous" className="data-[state=active]:bg-blue-600">Autonomous</TabsTrigger>
            <TabsTrigger value="sensors" className="data-[state=active]:bg-blue-600">IoT Sensors</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                    Live Traffic Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TrafficMap />
                </CardContent>
              </Card>

              <div className="space-y-6">
                <EmergencyVehicles />
                <AutonomousVehicles compact />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="signals">
            <TrafficSignals />
          </TabsContent>

          <TabsContent value="emergency">
            <EmergencyVehicles />
          </TabsContent>

          <TabsContent value="autonomous">
            <AutonomousVehicles />
          </TabsContent>

          <TabsContent value="sensors">
            <IoTSensors />
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
