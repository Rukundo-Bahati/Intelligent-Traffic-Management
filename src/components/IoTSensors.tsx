
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Radio, Thermometer, Gauge, Camera, AlertTriangle, CheckCircle } from 'lucide-react';

const IoTSensors = () => {
  const [sensors, setSensors] = useState([
    {
      id: 'TEMP-001',
      type: 'temperature',
      location: 'Highway 101 Bridge',
      value: 72,
      unit: '°F',
      status: 'online',
      batteryLevel: 85,
      lastUpdate: '2 min ago',
      threshold: { min: 32, max: 95 }
    },
    {
      id: 'FLOW-042',
      type: 'traffic_flow',
      location: 'Main St Intersection',
      value: 1247,
      unit: 'vehicles/hr',
      status: 'online',
      batteryLevel: 92,
      lastUpdate: '1 min ago',
      threshold: { min: 0, max: 2000 }
    },
    {
      id: 'CAM-018',
      type: 'camera',
      location: 'Downtown Plaza',
      value: 98,
      unit: '% uptime',
      status: 'online',
      batteryLevel: 67,
      lastUpdate: '30 sec ago',
      threshold: { min: 90, max: 100 }
    },
    {
      id: 'SPEED-203',
      type: 'speed',
      location: 'School Zone Ave',
      value: 28,
      unit: 'mph avg',
      status: 'warning',
      batteryLevel: 34,
      lastUpdate: '5 min ago',
      threshold: { min: 15, max: 35 }
    },
    {
      id: 'AIR-099',
      type: 'air_quality',
      location: 'City Center',
      value: 42,
      unit: 'AQI',
      status: 'offline',
      batteryLevel: 12,
      lastUpdate: '15 min ago',
      threshold: { min: 0, max: 150 }
    },
    {
      id: 'NOISE-156',
      type: 'noise',
      location: 'Residential District',
      value: 58,
      unit: 'dB',
      status: 'online',
      batteryLevel: 78,
      lastUpdate: '1 min ago',
      threshold: { min: 30, max: 70 }
    }
  ]);

  const [networkStats, setNetworkStats] = useState({
    totalSensors: 2156,
    onlineSensors: 2089,
    offlineSensors: 67,
    warningAlerts: 23
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => prev.map(sensor => ({
        ...sensor,
        value: sensor.type === 'temperature' 
          ? Math.max(sensor.threshold.min, Math.min(sensor.threshold.max, sensor.value + (Math.random() - 0.5) * 5))
          : sensor.type === 'traffic_flow'
          ? Math.max(0, sensor.value + Math.floor((Math.random() - 0.5) * 100))
          : sensor.type === 'speed'
          ? Math.max(15, Math.min(45, sensor.value + (Math.random() - 0.5) * 3))
          : sensor.value + (Math.random() - 0.5) * 10,
        batteryLevel: Math.max(0, sensor.batteryLevel - 0.1)
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'temperature': return Thermometer;
      case 'traffic_flow': return Gauge;
      case 'camera': return Camera;
      case 'speed': return Gauge;
      case 'air_quality': return Radio;
      case 'noise': return Radio;
      default: return Radio;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return { bg: 'bg-green-500', text: 'text-green-400' };
      case 'warning': return { bg: 'bg-yellow-500', text: 'text-yellow-400' };
      case 'offline': return { bg: 'bg-red-500', text: 'text-red-400' };
      default: return { bg: 'bg-slate-500', text: 'text-slate-400' };
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'bg-green-500';
    if (level > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Network Overview */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Radio className="w-5 h-5 mr-2 text-purple-400" />
            IoT Sensor Network Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-900/50 rounded-lg border border-slate-600">
              <div className="text-3xl font-bold text-purple-400">{networkStats.totalSensors}</div>
              <div className="text-slate-400 text-sm">Total Sensors</div>
            </div>
            <div className="text-center p-4 bg-slate-900/50 rounded-lg border border-slate-600">
              <div className="text-3xl font-bold text-green-400">{networkStats.onlineSensors}</div>
              <div className="text-slate-400 text-sm">Online</div>
            </div>
            <div className="text-center p-4 bg-slate-900/50 rounded-lg border border-slate-600">
              <div className="text-3xl font-bold text-red-400">{networkStats.offlineSensors}</div>
              <div className="text-slate-400 text-sm">Offline</div>
            </div>
            <div className="text-center p-4 bg-slate-900/50 rounded-lg border border-slate-600">
              <div className="text-3xl font-bold text-yellow-400">{networkStats.warningAlerts}</div>
              <div className="text-slate-400 text-sm">Alerts</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sensor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {sensors.map((sensor) => {
          const IconComponent = getSensorIcon(sensor.type);
          const statusColors = getStatusColor(sensor.status);
          
          return (
            <Card key={sensor.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{sensor.id}</h3>
                      <p className="text-slate-400 text-sm capitalize">{sensor.type.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {sensor.status === 'online' ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    )}
                    <Badge className={statusColors.bg} variant="secondary">
                      {sensor.status}
                    </Badge>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-slate-400 text-sm mb-1">Location</div>
                  <div className="text-white text-sm">{sensor.location}</div>
                </div>

                <div className="mb-4">
                  <div className="text-slate-400 text-sm mb-1">Current Reading</div>
                  <div className="text-2xl font-bold text-white">
                    {sensor.value.toFixed(sensor.type === 'traffic_flow' ? 0 : 1)} {sensor.unit}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-400">Battery Level</span>
                    <span className="text-white">{sensor.batteryLevel.toFixed(0)}%</span>
                  </div>
                  <Progress 
                    value={sensor.batteryLevel} 
                    className="h-2"
                  />
                </div>

                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-slate-400">Last Update</span>
                  <span className="text-white">{sensor.lastUpdate}</span>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Configure
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Calibrate
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default IoTSensors;
