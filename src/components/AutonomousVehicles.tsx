
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Car, Navigation, Wifi, Battery, Settings } from 'lucide-react';

interface AutonomousVehiclesProps {
  compact?: boolean;
}

const AutonomousVehicles = ({ compact = false }: AutonomousVehiclesProps) => {
  const [vehicles, setVehicles] = useState([
    {
      id: 'AV-001',
      model: 'Tesla Model S',
      location: 'Highway 101 North',
      destination: 'Tech Campus',
      autonomyLevel: 'Level 4',
      speed: 65,
      battery: 85,
      connectivity: 'excellent',
      passengers: 2,
      status: 'cruising'
    },
    {
      id: 'AV-024',
      model: 'Waymo Chrysler',
      location: 'Downtown District',
      destination: 'Shopping Center',
      autonomyLevel: 'Level 5',
      speed: 25,
      battery: 92,
      connectivity: 'good',
      passengers: 1,
      status: 'navigating'
    },
    {
      id: 'AV-156',
      model: 'Uber Volvo XC90',
      location: 'Residential Area',
      destination: 'Airport Terminal',
      autonomyLevel: 'Level 4',
      speed: 35,
      battery: 67,
      connectivity: 'fair',
      passengers: 3,
      status: 'pickup'
    }
  ]);

  const [totalConnected, setTotalConnected] = useState(1247);

  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prev => prev.map(vehicle => ({
        ...vehicle,
        speed: Math.max(0, Math.min(70, vehicle.speed + (Math.random() - 0.5) * 10)),
        battery: Math.max(20, Math.min(100, vehicle.battery + (Math.random() - 0.5) * 2))
      })));
      
      setTotalConnected(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getConnectivityColor = (connectivity: string) => {
    switch (connectivity) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'fair': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'cruising': return 'bg-green-500';
      case 'navigating': return 'bg-blue-500';
      case 'pickup': return 'bg-yellow-500';
      case 'idle': return 'bg-slate-500';
      default: return 'bg-slate-500';
    }
  };

  if (compact) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            <div className="flex items-center">
              <Car className="w-5 h-5 mr-2 text-blue-400" />
              Autonomous Vehicles
            </div>
            <Badge variant="secondary" className="bg-blue-600">
              {totalConnected.toLocaleString()} Connected
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {vehicles.slice(0, 2).map((vehicle) => (
              <div key={vehicle.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-600">
                <div className="flex items-center space-x-3">
                  <Car className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="font-medium text-white">{vehicle.id}</div>
                    <div className="text-slate-400 text-sm">{vehicle.model}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(vehicle.status)} variant="secondary">
                    {vehicle.status}
                  </Badge>
                  <div className="text-slate-400 text-sm mt-1">{vehicle.speed} mph</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center">
            <Car className="w-5 h-5 mr-2 text-blue-400" />
            Autonomous Vehicle Coordination
          </div>
          <Badge variant="secondary" className="bg-blue-600">
            {totalConnected.toLocaleString()} Connected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Fleet Statistics */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-3 bg-slate-900/50 rounded-lg border border-slate-600">
            <div className="text-2xl font-bold text-blue-400">{vehicles.length}</div>
            <div className="text-xs text-slate-400">Active Vehicles</div>
          </div>
          <div className="text-center p-3 bg-slate-900/50 rounded-lg border border-slate-600">
            <div className="text-2xl font-bold text-green-400">96%</div>
            <div className="text-xs text-slate-400">Connectivity</div>
          </div>
          <div className="text-center p-3 bg-slate-900/50 rounded-lg border border-slate-600">
            <div className="text-2xl font-bold text-yellow-400">42</div>
            <div className="text-xs text-slate-400">Avg Speed</div>
          </div>
          <div className="text-center p-3 bg-slate-900/50 rounded-lg border border-slate-600">
            <div className="text-2xl font-bold text-purple-400">81%</div>
            <div className="text-xs text-slate-400">Avg Battery</div>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">{vehicle.id}</h3>
                    <p className="text-slate-400 text-sm">{vehicle.model}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {vehicle.autonomyLevel}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(vehicle.status)} variant="secondary">
                    {vehicle.status}
                  </Badge>
                  <div className="text-slate-400 text-sm mt-1">{vehicle.passengers} passengers</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-slate-300 text-sm mb-1">Current Location</div>
                  <div className="text-white text-sm">{vehicle.location}</div>
                </div>
                <div>
                  <div className="text-slate-300 text-sm mb-1">Destination</div>
                  <div className="text-white text-sm">{vehicle.destination}</div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Navigation className="w-4 h-4 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">{vehicle.speed} mph</div>
                    <div className="text-slate-400 text-xs">Speed</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Battery className="w-4 h-4 text-green-400" />
                  <div>
                    <div className="text-white font-medium">{vehicle.battery}%</div>
                    <div className="text-slate-400 text-xs">Battery</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Wifi className={`w-4 h-4 ${getConnectivityColor(vehicle.connectivity)}`} />
                  <div>
                    <div className={`font-medium ${getConnectivityColor(vehicle.connectivity)}`}>
                      {vehicle.connectivity}
                    </div>
                    <div className="text-slate-400 text-xs">Signal</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Settings className="w-4 h-4 text-purple-400" />
                  <div>
                    <div className="text-white font-medium">Auto</div>
                    <div className="text-slate-400 text-xs">Mode</div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Navigation className="w-4 h-4 mr-1" />
                  Track Vehicle
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Settings className="w-4 h-4 mr-1" />
                  Send Commands
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AutonomousVehicles;
