
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Zap, Clock, AlertTriangle, Settings } from 'lucide-react';

const TrafficSignals = () => {
  const [signals, setSignals] = useState([
    { 
      id: 'TL-001', 
      location: 'Main St & 1st Ave', 
      status: 'green', 
      timing: 45, 
      mode: 'auto',
      density: 'medium',
      emergency: false
    },
    { 
      id: 'TL-002', 
      location: 'Broadway & Park Rd', 
      status: 'red', 
      timing: 30, 
      mode: 'auto',
      density: 'high',
      emergency: false
    },
    { 
      id: 'TL-003', 
      location: 'Highway 101 & Oak St', 
      status: 'yellow', 
      timing: 5, 
      mode: 'emergency',
      density: 'low',
      emergency: true
    },
    { 
      id: 'TL-004', 
      location: 'Center St & Mill Ave', 
      status: 'green', 
      timing: 60, 
      mode: 'auto',
      density: 'low',
      emergency: false
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSignals(prev => prev.map(signal => {
        if (signal.emergency) return signal;
        
        let newTiming = signal.timing - 1;
        let newStatus = signal.status;
        
        if (newTiming <= 0) {
          switch (signal.status) {
            case 'green':
              newStatus = 'yellow';
              newTiming = 5;
              break;
            case 'yellow':
              newStatus = 'red';
              newTiming = signal.density === 'high' ? 45 : 30;
              break;
            case 'red':
              newStatus = 'green';
              newTiming = signal.density === 'high' ? 60 : 45;
              break;
          }
        }
        
        return { ...signal, timing: newTiming, status: newStatus };
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const toggleEmergencyMode = (signalId: string) => {
    setSignals(prev => prev.map(signal => 
      signal.id === signalId 
        ? { 
            ...signal, 
            emergency: !signal.emergency,
            mode: !signal.emergency ? 'emergency' : 'auto',
            status: !signal.emergency ? 'green' : signal.status,
            timing: !signal.emergency ? 999 : 45
          }
        : signal
    ));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Zap className="w-5 h-5 mr-2 text-yellow-400" />
            Traffic Signal Control Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {signals.map((signal) => (
              <Card key={signal.id} className="bg-slate-900/50 border-slate-600">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-white text-lg">{signal.id}</h3>
                      <p className="text-slate-400 text-sm">{signal.location}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={signal.emergency ? 'destructive' : 'secondary'}
                        className={signal.emergency ? 'animate-pulse' : ''}
                      >
                        {signal.mode}
                      </Badge>
                      <Badge variant="outline" className="text-slate-300 border-slate-600">
                        {signal.density} density
                      </Badge>
                    </div>
                  </div>

                  {/* Traffic Light Visual */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-slate-800 p-2 rounded-lg border border-slate-600">
                      <div className="space-y-1">
                        <div className={`w-8 h-8 rounded-full ${signal.status === 'red' ? 'bg-red-500' : 'bg-red-900'} transition-colors`}></div>
                        <div className={`w-8 h-8 rounded-full ${signal.status === 'yellow' ? 'bg-yellow-500' : 'bg-yellow-900'} transition-colors`}></div>
                        <div className={`w-8 h-8 rounded-full ${signal.status === 'green' ? 'bg-green-500' : 'bg-green-900'} transition-colors`}></div>
                      </div>
                    </div>
                    
                    <div className="ml-4 text-center">
                      <div className="text-2xl font-bold text-white">
                        {signal.emergency ? '∞' : signal.timing}
                      </div>
                      <div className="text-slate-400 text-sm">
                        {signal.emergency ? 'Emergency' : 'seconds'}
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Emergency Override
                      </span>
                      <Switch
                        checked={signal.emergency}
                        onCheckedChange={() => toggleEmergencyMode(signal.id)}
                      />
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Settings className="w-4 h-4 mr-1" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Clock className="w-4 h-4 mr-1" />
                        Timing
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrafficSignals;
