import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Camera, User, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CapturedFace {
  id: string;
  name: string;
  imageUrl: string;
  capturedAt: string;
  status: "active" | "inactive";
}

// Mock data for demonstration
const mockFaces: CapturedFace[] = [
  {
    id: "1",
    name: "John Doe",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    capturedAt: "2024-01-15 10:30 AM",
    status: "active"
  },
  {
    id: "2", 
    name: "Jane Smith",
    imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b332e234?w=150&h=150&fit=crop&crop=face",
    capturedAt: "2024-01-14 02:15 PM",
    status: "active"
  },
  {
    id: "3",
    name: "Mike Johnson", 
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    capturedAt: "2024-01-13 11:45 AM",
    status: "inactive"
  }
];

export function FRTModule() {
  const [faces, setFaces] = useState<CapturedFace[]>(mockFaces);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [faceName, setFaceName] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCapturing(true);
        setShowDialog(true);
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageUrl);
        
        // Stop video stream
        const stream = video.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        setIsCapturing(false);
      }
    }
  };

  const saveFace = () => {
    if (capturedImage && faceName.trim()) {
      const newFace: CapturedFace = {
        id: Date.now().toString(),
        name: faceName.trim(),
        imageUrl: capturedImage,
        capturedAt: new Date().toLocaleString(),
        status: "active"
      };
      
      setFaces(prev => [newFace, ...prev]);
      setCapturedImage(null);
      setFaceName("");
      setShowDialog(false);
      
      toast({
        title: "Face Saved",
        description: `Face data for ${faceName} has been saved successfully.`,
      });
    }
  };

  const cancelCapture = () => {
    if (isCapturing && videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
    setIsCapturing(false);
    setCapturedImage(null);
    setFaceName("");
    setShowDialog(false);
  };

  const toggleStatus = (id: string) => {
    setFaces(prev => prev.map(face => 
      face.id === id 
        ? { ...face, status: face.status === "active" ? "inactive" : "active" }
        : face
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Face Recognition Technology</h2>
          <p className="text-muted-foreground">Manage face recognition data and enrollment</p>
        </div>
        
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button 
              onClick={startCapture}
              className="bg-gradient-primary text-primary-foreground hover:opacity-90"
            >
              <Camera className="mr-2 h-4 w-4" />
              Add Face
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Capture Face</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {isCapturing ? (
                <div className="space-y-4">
                  <div className="relative bg-muted rounded-lg overflow-hidden">
                    <video 
                      ref={videoRef}
                      className="w-full h-80 object-cover"
                      autoPlay
                      muted
                    />
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                  
                  <div className="flex gap-2 justify-center">
                    <Button onClick={capturePhoto}>
                      <Camera className="mr-2 h-4 w-4" />
                      Capture
                    </Button>
                    <Button variant="outline" onClick={cancelCapture}>
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : capturedImage ? (
                <div className="space-y-4">
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <img 
                      src={capturedImage} 
                      alt="Captured face" 
                      className="w-64 h-48 object-cover rounded-lg mx-auto"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="faceName">Enter Name</Label>
                    <Input
                      id="faceName"
                      value={faceName}
                      onChange={(e) => setFaceName(e.target.value)}
                      placeholder="Enter person's name"
                    />
                  </div>
                  
                  <div className="flex gap-2 justify-end">
                    <Button 
                      onClick={saveFace}
                      disabled={!faceName.trim()}
                      className="bg-gradient-primary text-primary-foreground"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={cancelCapture}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Click "Add Face" to start camera</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Faces</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{faces.length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {faces.filter(f => f.status === "active").length}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Inactive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {faces.filter(f => f.status === "inactive").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Faces Table */}
      <Card>
        <CardHeader>
          <CardTitle>Enrolled Faces</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Captured At</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faces.map((face) => (
                  <TableRow key={face.id}>
                    <TableCell>
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                        <img 
                          src={face.imageUrl} 
                          alt={face.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{face.name}</TableCell>
                    <TableCell className="text-muted-foreground">{face.capturedAt}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={face.status === "active" ? "default" : "secondary"}
                        className={face.status === "active" ? "bg-green-500 text-white" : ""}
                      >
                        {face.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleStatus(face.id)}
                      >
                        {face.status === "active" ? "Deactivate" : "Activate"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}