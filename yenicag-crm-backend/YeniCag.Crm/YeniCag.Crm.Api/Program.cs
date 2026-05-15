using Microsoft.EntityFrameworkCore;
using YeniCag.Crm.Api.Graphql.Mutations.Accounting;
using YeniCag.Crm.Api.Graphql.Mutations.Course;
using YeniCag.Crm.Api.Graphql.Mutations.Student;
using YeniCag.Crm.Api.Graphql.Mutations.Teacher;
using YeniCag.Crm.Api.Graphql.Queries;
using YeniCag.Crm.Api.Graphql.Queries.Accounting;
using YeniCag.Crm.Application.Operations.Accounting;
using YeniCag.Crm.Application.Operations.Course;
using YeniCag.Crm.Application.Operations.Student;
using YeniCag.Crm.Application.Operations.Teacher;
using YeniCag.Crm.Application.UseCases.Student.GetAllStudent;
using YeniCag.Crm.Core.Operations.Accounting;
using YeniCag.Crm.Core.Operations.Course;
using YeniCag.Crm.Core.Operations.Student;
using YeniCag.Crm.Core.Operations.Teacher;
using YeniCag.Crm.Persistance.Context;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("CrmDb"));
});

builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssembly(typeof(GetAllStudentRequest).Assembly));

builder.Services.AddScoped<IStudentOperation, StudentOperation>();
builder.Services.AddScoped<ICourseOperation, CourseOperation>();
builder.Services.AddScoped<ITeacherOperation, TeacherOperation>();
builder.Services.AddScoped<IAccountingOperation, AccountingOperation>();

builder.Services
    .AddGraphQLServer()
    .AddQueryType()
    .AddMutationType()
    .AddType<StudentQuery>()
    .AddType<CourseQuery>()
    .AddType<TeacherQuery>()
    .AddType<StudentMutations>()
    .AddType<CourseMutations>()
    .AddType<TeacherMutations>()
    .AddType<StudentEnrollmentQueries>()
    .AddType<AccountingQueries>()
    .AddType<AccountingMutations>()
    .AddType<DateOnly>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.MapGraphQL();

app.Run();