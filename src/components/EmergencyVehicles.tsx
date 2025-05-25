
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Truck, Navigation, Clock, MapPin } from 'lucide-react';

const EmergencyVehicles = () => {
  const [emergencyVehicles, setEmergencyVehicles] = useState([
    {
      id: 'AMB-001',
      type: 'ambulance',
      location: 'Main St & 2nd Ave',
      destination: 'City Hospital',
      priority: 'critical',
      eta: '3 min',
      distance: '0.8 mi',
      speed: 45,
      status: 'en-route'
    },
    {
      id: 'FIRE-003',
      type: 'fire',
      location: 'Broadway & Oak St',
      destination: '425 Park Avenue',
      priority: 'high',
      eta: '7 min',
      distance: '2.1 mi',
      speed: 38,
      status: 'dispatched'
    },
    {
      id: 'POL-012',
      type: 'police',
      location: 'Highway 101 & Exit 15',
      destination: 'Downtown Plaza',
      priority: 'medium',
      eta: '12 min',
      distance: '4.3 mi',
      speed: 55,
      status: 'responding'
    }
  ]);

  const [signalsCleared, setSignalsCleared] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEmergencyVehicles(prev => prev.map(vehicle => ({
        ...vehicle,
        eta: `${Math.max(1, parseInt(vehicle.eta) - 1)} min`,
        distance: `${Math.max(0.1, parseFloat(vehicle.distance) - 0.1).toFixed(1)} mi`
      })));
      
      setSignalsCleared(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'ambulance': return '🚑';
      case 'fire': return '🚒';
      case 'police': return '🚔';
      default: return '🚨';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600 animate-pulse';
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en-route': return 'text-green-400';
      case 'dispatched': return 'text-yellow-400';
      case 'responding': return 'text-blue-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
            Emergency Vehicle Tracking
          </div>
          <Badge variant="destructive" className="animate-pulse">
            {emergencyVehicles.length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-slate-900/50 rounded-lg border border-slate-600">
            <div className="text-2xl font-bold text-red-400">{emergencyVehicles.length}</div>
            <div className="text-xs text-slate-400">Active Units</div>
          </div>
          <div className="text-center p-3 bg-slate-900/50 rounded-lg border border-slate-600">
            <div className="text-2xl font-bold text-green-400">{signalsCleared}</div>
            <div className="text-xs text-slate-400">Signals Cleared</div>
          </div>
          <div className="text-center p-3 bg-slate-900/50 rounded-lg border border-slate-600">
            <div className="text-2xl font-bold text-blue-400">98%</div>
            <div className="text-xs text-slate-400">Path Efficiency</div>
          </div>
        </div>

        {/* Emergency Vehicles List */}
        <div className="space-y-3">
          {emergencyVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getVehicleIcon(vehicle.type)}</div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">{vehicle.id}</h3>
                    <p className="text-slate-400 text-sm capitalize">{vehicle.type} Unit</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getPriorityColor(vehicle.priority)}>
                    {vehicle.priority}
                  </Badge>
                  <div className={`text-sm mt-1 font-medium ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="flex items-center text-slate-300 text-sm mb-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    Current Location
                  </div>
                  <div className="text-white text-sm">{vehicle.location}</div>
                </div>
                <div>
                  <div className="flex items-center text-slate-300 text-sm mb-1">
                    <Navigation className="w-4 h-4 mr-1" />
                    Destination
                  </div>
                  <div className="text-white text-sm">{vehicle.destination}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="text-center">
                  <div className="text-blue-400 font-semibold">{vehicle.eta}</div>
                  <div className="text-slate-400 text-xs">ETA</div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 font-semibold">{vehicle.distance}</div>
                  <div className="text-slate-400 text-xs">Distance</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-400 font-semibold">{vehicle.speed} mph</div>
                  <div className="text-slate-400 text-xs">Speed</div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Navigation className="w-4 h-4 mr-1" />
                  Track Route
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Truck className="w-4 h-4 mr-1" />
                  Clear Path
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyVehicles;
