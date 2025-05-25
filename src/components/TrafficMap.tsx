
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, AlertTriangle } from 'lucide-react';

const TrafficMap = () => {
  const [trafficData, setTrafficData] = useState([
    { id: 1, x: 25, y: 30, density: 'high', type: 'intersection' },
    { id: 2, x: 60, y: 20, density: 'medium', type: 'highway' },
    { id: 3, x: 40, y: 60, density: 'low', type: 'residential' },
    { id: 4, x: 75, y: 45, density: 'high', type: 'intersection' },
    { id: 5, x: 15, y: 70, density: 'emergency', type: 'emergency' },
  ]);

  const [emergencyVehicles, setEmergencyVehicles] = useState([
    { id: 1, x: 20, y: 65, type: 'ambulance', heading: 45 },
    { id: 2, x: 70, y: 40, type: 'fire', heading: 180 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficData(prev => prev.map(point => ({
        ...point,
        x: Math.max(5, Math.min(95, point.x + (Math.random() - 0.5) * 2)),
        y: Math.max(5, Math.min(95, point.y + (Math.random() - 0.5) * 2)),
      })));

      setEmergencyVehicles(prev => prev.map(vehicle => ({
        ...vehicle,
        x: Math.max(5, Math.min(95, vehicle.x + (Math.random() - 0.5) * 3)),
        y: Math.max(5, Math.min(95, vehicle.y + (Math.random() - 0.5) * 3)),
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getDensityColor = (density: string) => {
    switch (density) {
      case 'low': return 'bg-green-400';
      case 'medium': return 'bg-yellow-400';
      case 'high': return 'bg-red-400';
      case 'emergency': return 'bg-red-600 animate-pulse';
      default: return 'bg-blue-400';
    }
  };

  return (
    <div className="relative w-full h-80 bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Traffic Density Points */}
      {trafficData.map((point) => (
        <div
          key={point.id}
          className={`absolute w-3 h-3 rounded-full ${getDensityColor(point.density)} transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2`}
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
        >
          <div className={`absolute inset-0 rounded-full ${getDensityColor(point.density)} animate-ping opacity-75`}></div>
        </div>
      ))}

      {/* Emergency Vehicles */}
      {emergencyVehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
          style={{ left: `${vehicle.x}%`, top: `${vehicle.y}%` }}
        >
          <div className="relative">
            <div className="w-4 h-4 bg-red-500 rounded-sm animate-pulse"></div>
            <div className="absolute -top-1 -left-1 w-6 h-6 bg-red-500 rounded-full opacity-30 animate-ping"></div>
            <AlertTriangle className="absolute -top-2 -left-2 w-8 h-8 text-red-400 animate-bounce" />
          </div>
        </div>
      ))}

      {/* Traffic Flow Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path
          d="M 10,50 Q 50,30 90,50"
          stroke="rgba(59, 130, 246, 0.5)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
          className="animate-pulse"
        />
        <path
          d="M 50,10 Q 30,50 50,90"
          stroke="rgba(34, 197, 94, 0.5)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
          className="animate-pulse"
        />
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 space-y-1">
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-slate-300">Low Traffic</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <span className="text-slate-300">Medium Traffic</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
          <span className="text-slate-300">High Traffic</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <AlertTriangle className="w-3 h-3 text-red-400" />
          <span className="text-slate-300">Emergency</span>
        </div>
      </div>

      {/* Coordinates */}
      <div className="absolute top-2 right-2">
        <Badge variant="secondary" className="bg-slate-800 text-slate-300">
          <MapPin className="w-3 h-3 mr-1" />
          Live View
        </Badge>
      </div>
    </div>
  );
};

export default TrafficMap;
