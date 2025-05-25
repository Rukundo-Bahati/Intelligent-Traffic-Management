
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, PieChart as PieChartIcon, Activity, Clock } from 'lucide-react';

const Analytics = () => {
  const [trafficData, setTrafficData] = useState([
    { time: '00:00', vehicles: 245, avgSpeed: 45 },
    { time: '04:00', vehicles: 123, avgSpeed: 55 },
    { time: '08:00', vehicles: 1247, avgSpeed: 25 },
    { time: '12:00', vehicles: 892, avgSpeed: 35 },
    { time: '16:00', vehicles: 1456, avgSpeed: 22 },
    { time: '20:00', vehicles: 678, avgSpeed: 38 },
  ]);

  const [emergencyData, setEmergencyData] = useState([
    { hour: '6AM', ambulance: 2, fire: 1, police: 3 },
    { hour: '12PM', ambulance: 4, fire: 2, police: 5 },
    { hour: '6PM', ambulance: 6, fire: 3, police: 8 },
    { hour: '12AM', ambulance: 3, fire: 1, police: 4 },
  ]);

  const [systemEfficiency, setSystemEfficiency] = useState([
    { name: 'Signal Optimization', value: 94, color: '#22c55e' },
    { name: 'Route Efficiency', value: 87, color: '#3b82f6' },
    { name: 'Emergency Response', value: 98, color: '#ef4444' },
    { name: 'Autonomous Integration', value: 82, color: '#a855f7' },
  ]);

  const [metrics, setMetrics] = useState({
    totalVehicles: 15247,
    avgTravelTime: '12.3 min',
    fuelSavings: '23%',
    co2Reduction: '18%',
    accidentReduction: '34%'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficData(prev => prev.map(point => ({
        ...point,
        vehicles: Math.max(50, point.vehicles + Math.floor((Math.random() - 0.5) * 100)),
        avgSpeed: Math.max(15, Math.min(65, point.avgSpeed + (Math.random() - 0.5) * 5))
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
            System Performance Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-slate-900/50 rounded-lg border border-slate-600">
              <div className="text-2xl font-bold text-blue-400">{metrics.totalVehicles.toLocaleString()}</div>
              <div className="text-slate-400 text-sm">Daily Vehicles</div>
              <div className="flex items-center justify-center mt-1">
                <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                <span className="text-green-400 text-xs">+5.2%</span>
              </div>
            </div>
            <div className="text-center p-4 bg-slate-900/50 rounded-lg border border-slate-600">
              <div className="text-2xl font-bold text-green-400">{metrics.avgTravelTime}</div>
              <div className="text-slate-400 text-sm">Avg Travel Time</div>
              <div className="flex items-center justify-center mt-1">
                <TrendingDown className="w-3 h-3 text-green-400 mr-1" />
                <span className="text-green-400 text-xs">-8.7%</span>
              </div>
            </div>
            <div className="text-center p-4 bg-slate-900/50 rounded-lg border border-slate-600">
              <div className="text-2xl font-bold text-yellow-400">{metrics.fuelSavings}</div>
              <div className="text-slate-400 text-sm">Fuel Savings</div>
              <div className="flex items-center justify-center mt-1">
                <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                <span className="text-green-400 text-xs">+12.4%</span>
              </div>
            </div>
            <div className="text-center p-4 bg-slate-900/50 rounded-lg border border-slate-600">
              <div className="text-2xl font-bold text-purple-400">{metrics.co2Reduction}</div>
              <div className="text-slate-400 text-sm">CO₂ Reduction</div>
              <div className="flex items-center justify-center mt-1">
                <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                <span className="text-green-400 text-xs">+7.8%</span>
              </div>
            </div>
            <div className="text-center p-4 bg-slate-900/50 rounded-lg border border-slate-600">
              <div className="text-2xl font-bold text-red-400">{metrics.accidentReduction}</div>
              <div className="text-slate-400 text-sm">Accident Reduction</div>
              <div className="flex items-center justify-center mt-1">
                <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                <span className="text-green-400 text-xs">+15.3%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Tabs */}
      <Tabs defaultValue="traffic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-slate-700">
          <TabsTrigger value="traffic" className="data-[state=active]:bg-blue-600">Traffic Flow</TabsTrigger>
          <TabsTrigger value="emergency" className="data-[state=active]:bg-blue-600">Emergency</TabsTrigger>
          <TabsTrigger value="efficiency" className="data-[state=active]:bg-blue-600">Efficiency</TabsTrigger>
          <TabsTrigger value="predictions" className="data-[state=active]:bg-blue-600">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Traffic Volume (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="vehicles"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Average Speed (mph)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="avgSpeed"
                      stroke="#22c55e"
                      strokeWidth={3}
                      dot={{ fill: '#22c55e', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Emergency Response Times</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={emergencyData}>
                  <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
                  <XAxis dataKey="hour" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="ambulance" fill="#ef4444" />
                  <Bar dataKey="fire" fill="#f97316" />
                  <Bar dataKey="police" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">System Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={systemEfficiency}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {systemEfficiency.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Efficiency Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemEfficiency.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-300">{item.name}</span>
                      <span className="text-white font-semibold">{item.value}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${item.value}%`,
                          backgroundColor: item.color
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Activity className="w-5 h-5 mr-2 text-purple-400" />
                AI Predictions & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Traffic Predictions</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-600">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300">Rush Hour Peak</span>
                        <Badge variant="secondary" className="bg-yellow-600">
                          <Clock className="w-3 h-3 mr-1" />
                          5:30 PM
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400">
                        Expected 35% increase in traffic volume on Highway 101
                      </p>
                    </div>
                    <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-600">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300">Congestion Alert</span>
                        <Badge variant="destructive">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          High Risk
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400">
                        Downtown area likely to experience heavy congestion
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">AI Recommendations</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-600">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300">Signal Optimization</span>
                        <Badge className="bg-green-600">
                          Implement
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400">
                        Adjust Main St signals to reduce wait time by 23%
                      </p>
                    </div>
                    <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-600">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300">Route Suggestion</span>
                        <Badge className="bg-blue-600">
                          Recommended
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400">
                        Redirect traffic via Park Ave to balance load
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
