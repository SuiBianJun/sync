<template>

    <Layout>
        <Content :style="{padding: '10px 50px'}">
            <Breadcrumb>
                <BreadcrumbItem to="/menuClient/syncdirinfo">
                    <Button type="primary" shape="circle">返回</Button>
                </BreadcrumbItem>
                <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
                <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
            </Breadcrumb>
            <Card style="margin-top: 10px;">
                <div style="min-height: 200px;">
                    Content
                </div>
            </Card>
        </Content>
    </Layout>

    

</template>