
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CalendarDays, User, Clock } from 'lucide-react';
import { StoryData } from './StoryCard';

interface StoryDialogProps {
  story: StoryData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StoryDialog = ({ story, open, onOpenChange }: StoryDialogProps) => {
  if (!story) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">{story.title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col space-y-6 py-4">
          <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-md">
            <img 
              src={story.image} 
              alt={story.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-accent/90 rounded-full px-3 py-1 text-xs font-medium text-white">
              {story.category}
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{story.author}</span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-1" />
              <span>{story.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{story.readTime} read</span>
            </div>
          </div>
          
          <div className="prose prose-slate max-w-none">
            <p className="mb-4 text-lg font-medium">
              {story.excerpt}
            </p>
            
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at dui vel urna volutpat tempor. Proin at risus justo. Etiam eget lorem vitae tellus convallis feugiat. Suspendisse potenti. Integer sodales lorem in diam ultricies, at tempus metus facilisis.
            </p>
            
            <p>
              Vivamus quis semper urna. Phasellus eu odio eget metus maximus feugiat eget quis enim. Maecenas in tellus felis. Nullam vitae orci blandit, suscipit turpis eu, tincidunt mi. Aliquam tristique nibh sit amet lectus convallis, in efficitur dui feugiat. Nunc dapibus semper velit, nec ultrices tellus vehicula vel.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">The Journey Begins</h2>
            
            <p>
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin faucibus arcu vel sollicitudin tempus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec lacinia mauris eu enim elementum, in euismod massa rutrum.
            </p>
            
            <p>
              Suspendisse interdum ligula sit amet arcu venenatis, non tincidunt metus feugiat. Maecenas quis orci malesuada, suscipit ligula vel, ultrices nulla. Sed vel lorem id dolor efficitur placerat. Aenean felis nisi, dignissim in dolor at, interdum placerat est. Mauris eget ipsum ornare, vestibulum risus ut, cursus eros.
            </p>
            
            <p>
              Fusce non faucibus odio. Ut rutrum hendrerit felis, a fermentum justo tempus ut. Nullam mattis pellentesque aliquam. Etiam ac augue eu sem volutpat ultricies vitae et justo. Praesent ut semper velit. Vivamus commodo diam tortor, sit amet viverra justo facilisis non.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">An Unexpected Discovery</h2>
            
            <p>
              Cras ut nulla velit. Cras at tortor ac nisl efficitur faucibus eget a mi. Mauris quis laoreet neque. Vestibulum imperdiet, libero a lobortis faucibus, eros libero feugiat erat, vel aliquam arcu purus nec orci. Aliquam auctor neque ut dolor congue feugiat. Sed sed enim tellus.
            </p>
            
            <p>
              In hac habitasse platea dictumst. Vestibulum varius ipsum a tellus consequat ornare. Sed consequat at eros non molestie. Suspendisse potenti. Sed commodo tellus ut metus tempus efficitur. Maecenas luctus faucibus ligula, vel fermentum orci sodales vel.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryDialog;
