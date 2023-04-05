import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { Construct } from 'constructs';


export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC for the ECS cluster
    const vpc = new ec2.Vpc(this, 'MyVpc', {
      maxAzs: 2,
    });

    // Create an ECS cluster
    const cluster = new ecs.Cluster(this, 'MyCluster', {
      vpc: vpc,
    });

    // Create a task definition for your container
    const taskDefinition = new ecs.TaskDefinition(this, 'MyTaskDefinition', {
      compatibility: ecs.Compatibility.EC2,
      memoryMiB: '512',
      cpu: '256',
    });

    // Add a container to the task definition
    const container = taskDefinition.addContainer('MyContainer', {
      image: ecs.ContainerImage.fromRegistry('demo-docker/flask_image'),
      memoryReservationMiB: 256,
      logging: ecs.LogDriver.awsLogs({ streamPrefix: 'my-container-logs' }),
    });

    // Create a service for the container
    const service = new ecs.Ec2Service(this, 'MyService', {
      cluster: cluster,
      taskDefinition: taskDefinition,
      desiredCount: 2,
      enableECSManagedTags: true,
    });
  }
}