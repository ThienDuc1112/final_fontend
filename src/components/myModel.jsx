import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function MyModel() {
  const value = `• I have 7 years of work experience in software development.
    • I have experience and strong at Software and Web Application using Java.
    • I am able to apply Selenium and Appium automation test frameworks using Java.
    • I am experienced at integrating automation tests and deploying applications into Continuous Integration, Jenkins.
    • Build project and manage development team.`;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="blue">View Sample</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sample Of Introduce Yourself</DialogTitle>
          <DialogDescription>
            <textarea
              className="dotTextArea"
              defaultValue={value}
              disabled={true}
            ></textarea>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
